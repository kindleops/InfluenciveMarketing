"use client";

import { useEffect, useRef } from "react";
import styles from "./GlassObject.module.css";

/**
 * The signature object: the brand mark — two offset planes — rendered as
 * real glass. Ray-marched in a single fragment shader:
 *
 *   · signed-distance rounded slabs, rotated by pointer, time and scroll
 *   · Fresnel reflection of a procedural studio (softboxes + strip lights)
 *   · refraction through the slab with per-channel IOR → spectral dispersion
 *   · a horizon line of light behind the object, bent by the glass
 *
 * Performance: bounding-sphere early-out, capped render resolution with
 * adaptive downscaling, ~40fps cap, paused offscreen / hidden tab.
 * Reduced motion renders one still frame. No WebGL → CSS fallback.
 */

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform mat3 u_rot;
uniform vec2 u_center;
uniform float u_dist;
uniform float u_reveal;

float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

float map(vec3 p) {
  vec3 q = u_rot * p;
  float a = sdRoundBox(q - vec3(-0.33, -0.33, -0.2), vec3(0.88, 0.88, 0.14), 0.1);
  float b = sdRoundBox(q - vec3( 0.33,  0.33,  0.2), vec3(0.88, 0.88, 0.14), 0.1);
  return min(a, b);
}

vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float e = 0.0012;
  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) +
                   k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));
}

const float H = 0.0; // horizon passes through the object's centre

// The world: a black studio with a luminous horizon behind the object and
// softboxes around the camera that only the glass can see.
vec3 env(vec3 d) {
  vec3 c = vec3(0.0006);
  float behind = smoothstep(0.0, 0.6, -d.z);
  float span = clamp(u_reveal * 1.2 - abs(d.x) * 1.3, 0.0, 1.0);
  float dy = d.y - H;

  // Horizon: a hairline of light, an elongated bloom, and a wide wash.
  float line = 1.0 - smoothstep(0.0, 0.0013, abs(dy));
  c += vec3(1.0, 0.99, 0.96) * line * 1.9 * span * behind;
  c += vec3(0.7, 0.76, 0.95) * exp(-abs(dy) * 40.0) * 0.16 * span * behind;
  c += vec3(0.42, 0.48, 0.68) * exp(-(d.x * d.x * 3.0 + dy * dy * 60.0)) * 0.1 * behind;

  // Studio (only reachable by reflected / refracted rays).
  float front = smoothstep(-0.1, 0.4, d.z);
  float top = smoothstep(0.42, 0.78, d.y) * (1.0 - smoothstep(0.3, 0.85, abs(d.x)));
  c += vec3(1.0, 0.98, 0.95) * top * 2.4;
  float stripR = (1.0 - smoothstep(0.0, 0.04, abs(d.y - 0.12))) * smoothstep(0.3, 0.75, d.x);
  c += vec3(0.96, 0.98, 1.0) * stripR * 2.4 * front;
  float stripL = (1.0 - smoothstep(0.0, 0.025, abs(d.y + 0.2))) * smoothstep(0.45, 0.85, -d.x);
  c += vec3(1.0) * stripL * 1.3 * front;
  // Large soft key behind the camera — gives front faces a graded sheen.
  c += vec3(0.85, 0.87, 0.92) * 0.9 * smoothstep(0.55, 1.0, d.z) * smoothstep(-0.2, 0.7, d.y);
  c += vec3(0.62, 0.44, 0.28) * 0.14 * (1.0 - smoothstep(-0.9, -0.2, d.y)) * front;
  return c;
}

// Smooth visible spectrum, x in [0,1] (red → violet).
vec3 spectrum(float x) {
  return clamp(vec3(
    1.0 - smoothstep(0.25, 0.55, x) + smoothstep(0.85, 1.0, x) * 0.35,
    smoothstep(0.1, 0.4, x) * (1.0 - smoothstep(0.6, 0.85, x)),
    smoothstep(0.45, 0.8, x)
  ), 0.0, 1.0);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec3 ro = vec3(0.0, 0.0, u_dist);
  vec3 rd = normalize(vec3(uv - u_center, -2.4));

  vec3 col = env(rd);

  // Bounding sphere early-out.
  float bR = 1.82;
  float bb = dot(ro, rd);
  float bc = dot(ro, ro) - bR * bR;
  float disc = bb * bb - bc;

  if (disc > 0.0 && u_reveal > 0.001) {
    float t = max(-bb - sqrt(disc), 0.0);
    float tMax = -bb + sqrt(disc);
    bool hit = false;
    for (int i = 0; i < 72; i++) {
      float d = map(ro + rd * t);
      if (d < 0.0008) { hit = true; break; }
      t += d;
      if (t > tMax) break;
    }
    if (hit) {
      vec3 p = ro + rd * t;
      vec3 n = normalAt(p);
      float cosi = max(dot(-rd, n), 0.0);
      float F = 0.04 + 0.96 * pow(1.0 - cosi, 5.0);

      // Enter the glass.
      vec3 rin = refract(rd, n, 1.0 / 1.47);
      vec3 q = p - n * 0.003;
      float s = 0.0;
      for (int i = 0; i < 40; i++) {
        float d = -map(q + rin * s);
        if (d < 0.0008) break;
        s += max(d, 0.003);
      }
      vec3 pe = q + rin * s;
      vec3 ne = normalAt(pe);

      // Leave it — integrate across the spectrum, each wavelength bending
      // by its own index: smooth dispersion rather than RGB fringes.
      vec3 refr = vec3(0.0);
      vec3 wsum = vec3(0.0);
      for (int k = 0; k < 6; k++) {
        float x = (float(k) + 0.5) / 6.0;
        vec3 w = spectrum(x);
        vec3 o = refract(rin, -ne, mix(1.448, 1.502, x));
        if (dot(o, o) < 0.01) o = reflect(rin, -ne);
        refr += env(o) * w;
        wsum += w;
      }
      refr /= wsum;

      vec3 absorb = exp(-s * vec3(0.55, 0.42, 0.3));
      vec3 refl = env(reflect(rd, n));
      vec3 glass = refr * absorb * (1.0 - F) + refl * F;
      glass += vec3(0.018, 0.02, 0.026) * (1.0 - F);            // internal scatter
      glass += vec3(1.0) * pow(1.0 - cosi, 3.0) * 0.06;           // edge sheen

      col = mix(col, glass, smoothstep(0.0, 1.0, u_reveal));
    }
  }

  // Filmic shoulder + dither.
  col = 1.0 - exp(-col * 1.15);
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function rotation(yaw: number, pitch: number, roll: number) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const cr = Math.cos(roll), sr = Math.sin(roll);
  // R = Rz(roll) * Rx(pitch) * Ry(yaw), column-major for GLSL.
  const m = [
    cr * cy + sr * sp * sy, sr * cp, cr * -sy + sr * sp * cy,
    -sr * cy + cr * sp * sy, cr * cp, sr * sy + cr * sp * cy,
    cp * sy, -sp, cp * cy,
  ];
  return new Float32Array(m);
}

export function GlassObject({ className, progressRef }: { className?: string; progressRef?: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl || gl.isContextLost()) {
      canvas.dataset.ready = "fallback";
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.dataset.ready = "fallback";
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"), uTime = u("u_time"), uRot = u("u_rot"), uCenter = u("u_center"), uDist = u("u_dist"), uReveal = u("u_reveal");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    let scale = mobile ? 0.55 : 0.8;
    let narrow = false;
    const maxPixels = mobile ? 320_000 : 900_000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = canvas.clientWidth * dpr * scale;
      let h = canvas.clientHeight * dpr * scale;
      const k = Math.min(1, Math.sqrt(maxPixels / Math.max(1, w * h)));
      w = Math.max(1, Math.floor(w * k));
      h = Math.max(1, Math.floor(h * k));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      // Composition: object centred, lifted; higher on narrow screens.
      const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
      gl.uniform2f(uCenter, 0, aspect < 0.8 ? 0.27 : 0.075);
      narrow = aspect < 0.8;
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const born = performance.now();
    let reveal = reduced ? 1 : 0;
    let raf = 0, last = 0, visible = true;
    let frames = 0, acc = 0;

    const draw = (now: number) => {
      const t = (now - born) / 1000;
      const intro = document.documentElement.dataset.intro === "running";
      if (!intro) reveal = Math.min(1, reveal + (reduced ? 1 : 0.012));
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      const scroll = progressRef?.current ?? 0;
      const ease = 1 - Math.pow(1 - reveal, 3);
      const yaw = -0.62 + Math.sin(t * 0.21) * 0.14 + pointer.x * 0.28 + scroll * 0.9 + (1 - ease) * 0.6;
      const pitch = 0.3 + Math.sin(t * 0.17) * 0.05 + pointer.y * 0.14 - scroll * 0.25;
      const roll = -0.08 + Math.sin(t * 0.11) * 0.03;
      gl.uniformMatrix3fv(uRot, false, rotation(yaw, pitch, roll));
      gl.uniform1f(uTime, t);
      gl.uniform1f(uDist, (narrow ? 20 : 12.8) + scroll * 3 + (1 - ease) * 2.5);
      gl.uniform1f(uReveal, ease);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = now - last;
      if (dt < 24) return;
      last = now;
      draw(now);
      // Adaptive resolution: if frames are slow, render fewer pixels.
      if (frames < 40) {
        frames++;
        acc += dt;
        if (frames === 40 && acc / 40 > 34 && scale > 0.4) {
          scale *= 0.72;
          resize();
          frames = 0;
          acc = 0;
        }
      }
    };
    const play = () => {
      if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(performance.now());
    canvas.dataset.ready = "true";

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onPointer, { passive: true });
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} className={[styles.canvas, className].filter(Boolean).join(" ")} aria-hidden="true" />;
}

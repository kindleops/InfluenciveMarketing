"use client";

import { useEffect, useRef } from "react";
import styles from "./LiquidField.module.css";

/**
 * Liquid light — slowly moving colour beneath glass.
 *
 * A single full-screen fragment shader (no 3D library). Domain-warped noise
 * produces soft cobalt / violet / cyan currents with rare warm highlights,
 * lit from a key light that drifts toward the pointer.
 *
 * Performance: rendered at reduced resolution and upscaled (the field is
 * soft by nature), capped to ~40fps, paused when offscreen or the tab is
 * hidden. Reduced motion renders a single still frame. No WebGL → CSS
 * gradient fallback (the element's background).
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_pointer;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.045;

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(fbm(p * 1.1 + 3.2 * q + vec2(1.7, 9.2) + t * 1.2),
                fbm(p * 1.1 + 3.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.05 + 3.4 * r);

  vec3 base   = vec3(0.010, 0.012, 0.018);
  vec3 cobalt = vec3(0.20, 0.32, 1.00);
  vec3 violet = vec3(0.50, 0.40, 1.00);
  vec3 cyan   = vec3(0.40, 0.85, 1.00);
  vec3 gold   = vec3(0.95, 0.78, 0.52);

  vec3 col = base;
  col = mix(col, cobalt * 0.46, smoothstep(0.42, 0.95, f));
  col = mix(col, violet * 0.42, smoothstep(0.6, 1.1, length(q)) * 0.5);
  col = mix(col, cyan * 0.38, smoothstep(0.66, 1.0, r.x) * 0.34);
  col += gold * pow(smoothstep(0.55, 0.95, f * r.y * 1.55), 3.0) * 0.24;

  // Key light: a single directional source above and right of centre,
  // drifting slightly toward the pointer. Everything else falls to black.
  vec2 lightPos = vec2(0.64 + u_pointer.x * 0.1, 1.04 + u_pointer.y * 0.04);
  float key = 1.0 - smoothstep(0.0, 1.0, length((uv - lightPos) * vec2(0.85, 1.35)));
  col *= 0.07 + key * key * 1.9;

  // Vignette + floor falloff so type always sits on deep black.
  col *= 1.0 - smoothstep(0.25, 1.35, length(p * vec2(0.85, 1.25)));
  col *= smoothstep(-0.05, 0.45, uv.y) * 0.85 + 0.15;

  // Dither to prevent banding in the dark ramps.
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function LiquidField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl || gl.isContextLost()) {
      canvas.dataset.ready = "true";
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
      canvas.dataset.ready = "true";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uPointer = gl.getUniformLocation(prog, "u_pointer");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 720px)").matches;
    const scale = small ? 0.35 : 0.5;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    let raf = 0;
    let visible = true;
    let last = 0;
    const start = performance.now() - 20000; // start mid-flow, not from a seed pattern
    const draw = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 24) return; // ~40fps is plenty for slow light
      last = now;
      draw(now);
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
      if (reduced || !raf) draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
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
  }, []);

  return <canvas ref={canvasRef} className={[styles.canvas, className].filter(Boolean).join(" ")} aria-hidden="true" />;
}

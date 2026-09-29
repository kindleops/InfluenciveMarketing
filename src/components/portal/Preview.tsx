import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import type { Preview as PreviewT } from "@/portal/model";
import horizon from "@/assets/plates/horizon.jpg";
import growth from "@/assets/plates/growth.jpg";
import operations from "@/assets/plates/operations.jpg";
import product from "@/assets/plates/product.jpg";
import relaunch from "@/assets/plates/relaunch.jpg";
import s from "./preview.module.css";

const PLATES: Record<NonNullable<PreviewT["plate"]>, StaticImageData> = { horizon, growth, operations, product, relaunch };

/**
 * Renders a piece of work at its real aspect ratio. `sizes` should describe
 * how wide the preview is drawn so the plate is fetched at the right size.
 */
export function Preview({
  preview,
  brand,
  sizes = "(min-width: 1100px) 30vw, 90vw",
  fit,
  priority,
  className,
}: {
  preview: PreviewT;
  brand?: string;
  sizes?: string;
  fit?: "contain";
  priority?: boolean;
  className?: string;
}) {
  const { plate, layout, headline, sub, tone } = preview;
  const img = (cls?: string) =>
    plate ? (
      <Image src={PLATES[plate]} alt="" fill sizes={sizes} quality={75} className={`${s.img} ${cls ?? ""}`} placeholder="blur" preload={priority} />
    ) : null;
  const word = (brand ?? "").split(" ")[0];

  return (
    <div
      className={`${s.frame} ${className ?? ""}`}
      style={{ "--ar": preview.aspect.replace("/", " / ") } as CSSProperties}
      data-tone={tone}
      data-fit={fit}
      aria-hidden="true"
    >
      {layout === "ad" && (
        <>
          {img()}
          <span className={s.grade} />
          <div className={s.ad}>
            <span className={s.brand}>{word}</span>
            <div>
              {headline && <p className={s.headline}>{headline}</p>}
              {sub && <p className={s.sub}>{sub}</p>}
            </div>
          </div>
        </>
      )}
      {layout === "frame" && (
        <>
          {img()}
          <span className={s.grade} style={{ opacity: 0.6 }} />
          {(headline || sub) && <span className={s.caption}>{headline ?? sub}</span>}
        </>
      )}
      {layout === "page" && (
        <div className={s.browser}>
          <div className={s.chrome}>
            <i />
            <i />
            <i />
            <span />
          </div>
          <div className={s.site}>
            <div className={s.siteNav}>
              <span>{word}</span>
              <span>Rooms · Collections · Trade</span>
            </div>
            <div className={s.siteCopy}>
              {headline && <p className={s.headline}>{headline}</p>}
              {sub && <p className={s.sub}>{sub}</p>}
            </div>
            <div className={s.siteImg}>{img()}</div>
          </div>
        </div>
      )}
      {layout === "doc" && (
        <div className={s.doc}>
          {plate && <div className={s.docStrip}>{img()}</div>}
          <span className={s.docMeta}>{word}</span>
          <div>
            <span className={s.docRule} style={{ display: "block", marginBottom: "5cqi" }} />
            {headline && <p className={s.docTitle}>{headline}</p>}
            {sub && <p className={s.docSub}>{sub}</p>}
          </div>
        </div>
      )}
      {layout === "type" && (
        <div className={s.type}>
          <span className={s.typeWord}>{headline}</span>
          {sub && <span className={s.typeSub}>{sub}</span>}
        </div>
      )}
      {layout === "film" && (
        <div className={s.film}>
          {img()}
          <span className={s.grade} />
          <span className={s.play}>
            <svg viewBox="0 0 20 20">
              <path d="M7 5.5v9l7.5-4.5L7 5.5Z" />
            </svg>
          </span>
          {headline && <span className={s.filmTitle}>{headline}</span>}
          {sub && <span className={s.timecode}>{sub}</span>}
        </div>
      )}
      {layout === "email" && (
        <div className={s.email}>
          <div className={s.emailHead}>{word}</div>
          <div className={s.emailImg}>{img()}</div>
          <div className={s.emailBody}>
            {headline && <p className={s.headline}>{headline}</p>}
            <span className={s.cta}>Read more</span>
          </div>
        </div>
      )}
    </div>
  );
}

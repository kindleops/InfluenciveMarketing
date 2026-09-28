import Image from "next/image";
import Link from "next/link";
import { clients, testimonials, type Testimonial } from "@/content/proof";
import { Eyebrow } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./Proof.module.css";

/**
 * Proof architecture. Renders only when real, approved entries exist in
 * content/proof.ts — otherwise returns nothing, so the page never shows an
 * empty or fabricated slot.
 */
export function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className={styles.quote}>
      <blockquote>
        <p>“{t.quote}”</p>
      </blockquote>
      <figcaption>
        <span className={styles.qName}>{t.name}</span>
        <span className={styles.qRole}>
          {t.role}, {t.company}
        </span>
        {t.work && (
          <Link href={`/work/${t.work}`} className={styles.qLink}>
            Read the case study
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

export function LogoWall() {
  if (!clients.length) return null;
  return (
    <ul className={styles.logos} role="list" aria-label="Selected clients">
      {clients.map((c) => (
        <li key={c.name}>
          <Image src={c.logo} alt={c.name} width={140} height={40} className={styles.logo} />
        </li>
      ))}
    </ul>
  );
}

export function ProofSection() {
  if (!testimonials.length && !clients.length) return null;
  return (
    <Section tone="dark" labelledBy="proof-title">
      <Eyebrow>In their words</Eyebrow>
      <h2 id="proof-title" className="sr-only">
        Client testimonials
      </h2>
      <LogoWall />
      <div className={styles.quotes}>
        {testimonials.map((t) => (
          <Quote key={t.name + t.company} t={t} />
        ))}
      </div>
    </Section>
  );
}

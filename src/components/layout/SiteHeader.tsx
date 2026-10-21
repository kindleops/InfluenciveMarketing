"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { primaryCta, primaryNav, servicesMenu } from "@/config/navigation";
import { brand } from "@/config/brand";
import { getLenis } from "@/components/system/SmoothScroll";
import { openSearch } from "@/components/search/CommandPalette";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // The services flyout is CSS hover/focus driven; after a choice it stays
  // shut until the pointer (or focus) leaves, so it never lingers over the
  // page it just opened.
  const [megaOff, setMegaOff] = useState(false);
  const [hl, setHl] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false });
  const listRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Material elevates after the first scroll; bar yields on scroll-down and
  // returns on scroll-up so it never competes with content.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 16);
        const delta = y - last;
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 480);
          last = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const lastPath = useRef(pathname);
  useEffect(() => {
    close();
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setMegaOff(true);
    }
  }, [pathname, close]);

  // Once the pointer moves anywhere outside the flyout, it may open again.
  useEffect(() => {
    if (!megaOff) return;
    // Real movement only: hiding the panel makes the browser re-hit-test
    // under a still pointer, which must not count as leaving.
    const onMove = (e: PointerEvent) => {
      if (!e.movementX && !e.movementY) return;
      if (!(e.target as Element | null)?.closest?.(`.${styles.hasMenu}`)) setMegaOff(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [megaOff]);

  // Menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    const lenis = getLenis();
    if (!open) {
      lenis?.start();
      document.documentElement.style.removeProperty("overflow");
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).concat(
        toggleRef.current ? [toggleRef.current] : [],
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastItem?.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.removeProperty("overflow");
      lenis?.start();
    };
  }, [open]);

  const moveHighlight = (el: HTMLElement) => {
    const list = listRef.current;
    if (!list) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setHl({ x: a.left - b.left, w: a.width, on: true });
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !open) || undefined}
        data-open={open || undefined}
      >
        <div className={styles.bar}>
          <span className={styles.material} aria-hidden="true" />
          <Link href="/" className={styles.brand} aria-label={`${brand.name} — home`}>
            <Wordmark animate />
          </Link>

          <nav aria-label="Primary" className={styles.nav}>
            <ul
              ref={listRef}
              role="list"
              className={styles.links}
              onPointerLeave={() => setHl((h) => ({ ...h, on: false }))}
              style={{ "--hl-x": `${hl.x}px`, "--hl-w": `${hl.w}px` } as CSSProperties}
            >
              <li className={styles.highlight} data-on={hl.on || undefined} aria-hidden="true" role="presentation" />
              {primaryNav.map((item) => (
                <li
                  key={item.href}
                  className={item.href === "/services" ? styles.hasMenu : undefined}
                  {...(item.href === "/services"
                    ? {
                        "data-off": megaOff || undefined,
                        onFocus: (e: React.FocusEvent<HTMLLIElement>) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOff(false);
                        },
                        onBlur: (e: React.FocusEvent<HTMLLIElement>) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOff(false);
                        },
                        onClick: (e: React.MouseEvent) => {
                          if ((e.target as HTMLElement).closest("a")) setMegaOff(true);
                        },
                      }
                    : {})}
                >
                  <Link
                    href={item.href}
                    className={styles.link}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onPointerEnter={(e) => moveHighlight(e.currentTarget)}
                    onFocus={(e) => moveHighlight(e.currentTarget)}
                    onBlur={() => setHl((h) => ({ ...h, on: false }))}
                  >
                    {item.label}
                    {item.href === "/services" && (
                      <svg className={styles.chev} width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="m2.5 4 2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                  {item.href === "/services" && (
                    <div className={styles.mega}>
                      <div className={styles.megaInner}>
                        {servicesMenu.map((g) => (
                          <div key={g.title} className={styles.megaCol} data-group={g.title}>
                            <p className={styles.megaTitle}>{g.title}</p>
                            <ul role="list">
                              {g.items.map((x) => (
                                <li key={x.href}>
                                  <Link href={x.href} className={styles.megaLink}>
                                    <b>{x.label}</b>
                                    {x.description && <span>{x.description}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link href="/services" className={styles.megaFoot}>
                        All services
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6h8M6.5 2.5 10 6 6.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.search} onClick={openSearch} aria-label="Search the site" aria-keyshortcuts="Meta+K Control+K">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m12.2 12.2 3.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className={styles.searchLabel} aria-hidden="true">
                Search
              </span>
              <kbd className={styles.searchKey} aria-hidden="true">
                ⌘K
              </kbd>
            </button>
            <Button href={primaryCta.href} size="md" arrow magnetic className={styles.cta}>
              {primaryCta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleLabel} aria-hidden="true">
                {open ? "Close" : "Menu"}
              </span>
              <span className={styles.toggleIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        className={styles.menu}
        data-open={open || undefined}
        aria-hidden={!open}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.menuLight} aria-hidden="true" />
        <nav aria-label="Mobile" className={styles.menuInner}>
          <ul role="list" className={styles.menuList}>
            {primaryNav.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as CSSProperties}>
                <Link href={item.href} className={styles.menuLink} aria-current={isActive(item.href) ? "page" : undefined}>
                  <span className={styles.menuIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  <span className={styles.menuDesc}>{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot} style={{ "--i": primaryNav.length } as CSSProperties}>
            <Button href={primaryCta.href} size="lg" arrow className={styles.menuCta}>
              {primaryCta.label}
            </Button>
            <a href={`mailto:${brand.email}`} className={styles.menuEmail}>
              {brand.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

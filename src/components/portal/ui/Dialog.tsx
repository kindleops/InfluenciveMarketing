"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PButton } from ".";
import s from "./overlay.module.css";

/**
 * Modal built on <dialog>: the browser provides the focus trap, inert
 * background and Escape. On phones it becomes a bottom sheet.
 */
export function Dialog({
  open,
  onClose,
  label,
  labelledBy,
  size = "default",
  children,
  hideClose,
}: {
  open: boolean;
  onClose: () => void;
  label?: string;
  labelledBy?: string;
  size?: "default" | "wide" | "palette";
  children: ReactNode;
  hideClose?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      restore.current = document.activeElement as HTMLElement;
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    return () => {
      if (d?.open) d.close();
    };
  }, []);

  const requestClose = useCallback(() => {
    if (closing) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClosing(true);
    window.setTimeout(
      () => {
        setClosing(false);
        ref.current?.close();
        onClose();
        restore.current?.focus?.();
      },
      reduced ? 0 : 190,
    );
  }, [closing, onClose]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      data-size={size}
      data-closing={closing ? "" : undefined}
      aria-label={label}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className={s.sheet}>
        {!hideClose && (
          <PButton variant="ghost" size="sm" icon="x" iconOnly className={s.close} onClick={requestClose}>
            Close
          </PButton>
        )}
        {open && children}
      </div>
    </dialog>
  );
}

/** A dialog whose open state lives in the URL (?item=…), so it can be linked to. */
export function RouteDialog({
  closeHref,
  label,
  labelledBy,
  size,
  children,
}: {
  closeHref: string;
  label?: string;
  labelledBy?: string;
  size?: "default" | "wide";
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <Dialog open onClose={() => router.push(closeHref, { scroll: false })} label={label} labelledBy={labelledBy} size={size}>
      {children}
    </Dialog>
  );
}

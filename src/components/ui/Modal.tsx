"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, title, children, className = "", showCloseButton = true }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (dialog && e.target === dialog) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      aria-label={title}
      className={`backdrop:bg-black/50 bg-white rounded-2xl shadow-xl ${className}`}
      style={{ maxWidth: "95vw", maxHeight: "100dvh", padding: 0 }}
    >
      <div className="relative overflow-y-auto h-full">
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
}

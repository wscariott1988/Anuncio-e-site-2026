"use client";

import { useState, useCallback } from "react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  onOpen?: (id: string) => void;
}

function AccordionItem({ id, question, answer, onOpen }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) onOpen?.(id);
      return !prev;
    });
  }, [id, onOpen]);

  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <h3>
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={`panel-${id}`}
          id={`trigger-${id}`}
          className="w-full flex items-center justify-between py-5 px-6 text-left text-[var(--text-primary)] font-medium text-base hover:bg-gray-50 transition-colors"
        >
          <span className="pr-4">{question}</span>
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      {isOpen && (
        <div
          id={`panel-${id}`}
          role="region"
          aria-labelledby={`trigger-${id}`}
          className="px-6 pb-5 text-[var(--text-secondary)] text-[15px] leading-relaxed"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  onItemOpen?: (id: string) => void;
}

export function Accordion({ items, onItemOpen }: AccordionProps) {
  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
      {items.map((item) => (
        <AccordionItem key={item.id} {...item} onOpen={onItemOpen} />
      ))}
    </div>
  );
}

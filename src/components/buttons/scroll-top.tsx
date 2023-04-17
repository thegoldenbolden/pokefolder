'use client';
import { ArrowUpIcon } from '@ui/icons';

export default function ScrollTop() {
  return (
    <button
      onClick={() => window && window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="scroll to top"
      className="fixed z-50 bottom-8 right-16"
    >
      <ArrowUpIcon className="w-8 h-8 text-tw-primary" />
    </button>
  );
}

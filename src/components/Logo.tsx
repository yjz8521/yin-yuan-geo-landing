/** Brand mark: an AI sparkle inside citation brackets — "cited by AI". Keep in sync with src/app/icon.svg. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="15" fill="#0a0a0a" />
      <path d="M19 15h-6v34h6M45 15h6v34h-6" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 18C33 27 37 31 46 32C37 33 33 37 32 46C31 37 27 33 18 32C27 31 31 27 32 18Z" fill="#60a5fa" />
    </svg>
  );
}

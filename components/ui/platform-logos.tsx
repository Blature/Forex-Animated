/**
 * Minimal monochrome platform glyphs for download buttons (currentColor).
 * Nominative use on OS download links.
 */

export function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 5.4 10.3 4.3v6.9H3zM11.3 4.15 21 2.7v8.5h-9.7zM3 12.2h7.3v6.9L3 18zM11.3 12.2H21v8.5l-9.7-1.45z" />
    </svg>
  );
}

export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.37 1.43c0 1.06-.43 2.06-1.13 2.8-.76.8-2 1.42-3.03 1.35-.13-1.05.37-2.16 1.06-2.86C14.05 1.9 15.36 1.3 16.37 1.43zM20.9 17.3c-.56 1.3-.84 1.87-1.56 3.02-1 1.6-2.42 3.6-4.17 3.61-1.56.02-1.96-1.01-4.07-1-2.11.01-2.55 1.02-4.1 1-1.76-.02-3.1-1.82-4.1-3.42C.13 16.5-.34 10.96 1.9 8c1.07-1.42 2.78-2.32 4.39-2.32 1.6 0 2.6 1.03 3.92 1.03 1.28 0 2.06-1.03 3.9-1.03 1.43 0 2.95.78 4.04 2.13-3.55 1.95-2.97 7.02.7 9.49z" />
    </svg>
  );
}

export function AndroidLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 9.5h12v7a1.2 1.2 0 0 1-1.2 1.2h-.8V20a1.3 1.3 0 0 1-2.6 0v-2.3h-2.8V20a1.3 1.3 0 0 1-2.6 0v-2.3H7.2A1.2 1.2 0 0 1 6 16.5zM3.6 9.6a1.25 1.25 0 0 1 2.5 0v4.4a1.25 1.25 0 0 1-2.5 0zM17.9 9.6a1.25 1.25 0 0 1 2.5 0v4.4a1.25 1.25 0 0 1-2.5 0zM7.8 4.2 6.9 2.9a.32.32 0 0 1 .53-.36l1 1.43a6.6 6.6 0 0 1 5.14 0l1-1.43a.32.32 0 0 1 .53.36l-.9 1.3A5.3 5.3 0 0 1 18 8.6H6a5.3 5.3 0 0 1 1.8-4.4zM9.6 6.6a.65.65 0 1 0 0-1.3.65.65 0 0 0 0 1.3zm4.8 0a.65.65 0 1 0 0-1.3.65.65 0 0 0 0 1.3z" />
    </svg>
  );
}

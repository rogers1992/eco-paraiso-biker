export function EmptyStateIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M100 60C100 60 120 60 120 80C120 100 100 100 100 100C100 100 80 100 80 80C80 60 100 60 100 60Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <circle cx="100" cy="75" r="8" fill="currentColor" />
      <path
        d="M100 140V100"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M85 115H115"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

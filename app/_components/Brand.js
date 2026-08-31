export default function Brand({ className = "" }) {
  return (
    <span className={className}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="30" height="30" rx="9" fill="#a996ff" />
        <path
          d="M9 23V9l14 14V9M9 9h5m4 14h5"
          stroke="#111019"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      NovaFlow
    </span>
  );
}

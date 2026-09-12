export default function StudioBrand({ className = "" }) {
  return (
    <span className={className}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="30" height="30" rx="9" fill="#b9a6ff" />
        <path
          d="M10 9v14m12-14-9 7 9 7"
          stroke="#191225"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        KAVIRO <span>Studio</span>
      </span>
    </span>
  );
}

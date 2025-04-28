export const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#e3e3e3"
  >
    <path d="M480-360 280-560h400L480-360Z" />
  </svg>
);

export const ChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#e3e3e3"
  >
    <path d="m280-400 200-200 200 200H280Z" />
  </svg>
);

export const SidebarHidden = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="4" width="6" height="16" strokeWidth="2" />
    <rect x="13" y="4" width="6" height="16" strokeWidth="2" />
  </svg>
);

export const SidebarVisible = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left Panel (filled) */}
    <rect x="3" y="4" width="8" height="16" fill="currentColor" stroke="currentColor" />

    {/* Right Panel (outline) */}
    <rect x="13" y="4" width="8" height="16" fill="none" stroke="currentColor" />
  </svg>
);

export const BottomSectionHidden = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="5" y="4" width="14" height="6" strokeWidth="2" />
    <rect x="5" y="14" width="14" height="6" strokeWidth="2" />
  </svg>
);

export const BottomSectionVisible = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect
      x="5"
      y="14"
      width="14"
      height="6"
      strokeWidth="2"
      fill="currentColor"
      stroke="currentColor"
    />
    <rect x="5" y="4" width="14" height="6" strokeWidth="2" fill="none" stroke="currentColor" />
  </svg>
);

export const SearchIcon = ({ size = 24, stroke = "currentColor", strokeWidth = 1.5, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} >
          
      <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"/>
      <path d="M22 22L20 20"/>
    </svg>
  );
};
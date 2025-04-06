export const MenuIcon = ({size = 24, stroke = "currentColor", strokeWidth = 2, ...props}) => {
    return (
      <svg
        width={size}
        height={size}
        stroke={stroke}
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props} >
  
        <path d="M4 6H20" />
        <path d="M4 12H20" />
        <path d="M4 18H20" />
      </svg>
    );
  };
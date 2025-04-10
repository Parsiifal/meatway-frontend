export const CaseIcon = ({ size = 30, stroke = "currentColor", strokeWidth = 0.1, fill = "currentColor", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props} >
      
      <path d="M8,8 L4,8 L4,13 L11,13 L13,13 L20,13 L20,8 L16,8 L8,8 Z M8,6 L8,5 C8,3.8954305 8.8954305,3 10,3 L14,3 C15.1045695,3 16,3.8954305 16,5 L16,6 L20,6 C21.1045695,6 22,6.8954305 22,8 L22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,8 C2,6.8954305 2.8954305,6 4,6 L8,6 Z M11,15 L4,15 L4,19 L20,19 L20,15 L13,15 L13,16 L11,16 L11,15 Z M14,6 L14,5 L10,5 L10,6 L14,6 Z"/>
    </svg>
  );
};
  
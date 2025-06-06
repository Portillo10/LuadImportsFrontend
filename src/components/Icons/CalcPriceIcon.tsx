import { IconProps } from "../../types/iconProps";

const CalcPriceIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6Zm1 2a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H7Zm6 7a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm-3 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H10Zm-4 1a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1-4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H7Zm2 1a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1Zm4-4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H13ZM9 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1ZM7 8a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H7Z"
        fill={color}
        fillRule="evenodd"
        className="fill-374151"
      ></path>
    </svg>
  );
};

export default CalcPriceIcon;

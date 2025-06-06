import { IconProps } from "../../types/iconProps";

const PlayIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <g data-name="Layer 2">
        <path
          d="M15 2.5A12.5 12.5 0 1 0 27.5 15 12.514 12.514 0 0 0 15 2.5Zm4.968 14.14-5.647 3.942a2 2 0 0 1-3.144-1.64v-7.883a2 2 0 0 1 3.144-1.641l5.647 3.941a2 2 0 0 1 0 3.28Z"
          fill="none"
        ></path>
        <path
          d="M15 0a15 15 0 1 0 15 15A15.016 15.016 0 0 0 15 0Zm0 27.5A12.5 12.5 0 1 1 27.5 15 12.514 12.514 0 0 1 15 27.5Z"
          fill={color}
          className="fill-000000"
        ></path>
        <path
          d="M19.968 13.36 14.32 9.417a2 2 0 0 0-3.144 1.64v7.883a2 2 0 0 0 3.144 1.641l5.647-3.941v-.001a2 2 0 0 0 0-3.28Z"
          fill={color}
          className="fill-000000"
        ></path>
      </g>
    </svg>
  );
};

export default PlayIcon;

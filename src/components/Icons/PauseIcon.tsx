import { IconProps } from "../../types/iconProps";

const PauseIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <g data-name="Layer 2">
        <path
          d="M15 2.5A12.5 12.5 0 1 0 27.5 15 12.514 12.514 0 0 0 15 2.5Zm-1.696 16.429a1.25 1.25 0 0 1-2.5 0V11.07a1.25 1.25 0 0 1 2.5 0Zm5.892 0a1.25 1.25 0 0 1-2.5 0V11.07a1.25 1.25 0 0 1 2.5 0Z"
          fill="none"
        ></path>
        <path
          d="M15 0a15 15 0 1 0 15 15A15.017 15.017 0 0 0 15 0Zm0 27.5A12.5 12.5 0 1 1 27.5 15 12.514 12.514 0 0 1 15 27.5Z"
          fill={color}
          className="fill-000000"
        ></path>
        <path
          d="M12.054 9.821a1.25 1.25 0 0 0-1.25 1.25v7.858a1.25 1.25 0 0 0 2.5 0V11.07a1.25 1.25 0 0 0-1.25-1.25ZM17.946 9.821a1.25 1.25 0 0 0-1.25 1.25v7.858a1.25 1.25 0 0 0 2.5 0V11.07a1.25 1.25 0 0 0-1.25-1.25Z"
          fill={color}
          className="fill-000000"
        ></path>
      </g>
    </svg>
  );
};

export default PauseIcon;

import React from "react";
import { IconProps } from "../../types/iconProps";

const StopIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path
        d="M328 160H184c-13.2 0-24 10.8-24 24v144c0 13.2 10.8 24 24 24h144c13.2 0 24-10.8 24-24V184c0-13.2-10.8-24-24-24zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208-93.3 208-208 208z"
        fill={color}
        className="fill-000000"
      ></path>
    </svg>
  );
};

export default StopIcon;

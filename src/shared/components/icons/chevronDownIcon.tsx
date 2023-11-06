import { FC } from "react";
import { IconProps } from "./core/iconType";

export const ChevronDownIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={className}
    >
      <path d="M435.658 228.913L251.656 404.907C243.922 412.313 233.953 416 224 416S204.078 412.313 196.344 404.907L12.342 228.913C-3.611 213.633 -4.174 188.321 11.092 172.353C26.373 156.354 51.686 155.854 67.655 171.103L224 320.66L380.345 171.103C396.314 155.822 421.627 156.385 436.908 172.353C452.174 188.321 451.611 213.633 435.658 228.913Z" />
    </svg>
  );
};

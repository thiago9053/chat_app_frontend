import { FC } from "react";
import { IconProps } from "./core/iconType";

export const ThemesIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path d="M256 16C123.453 16 16 123.451 16 256S123.453 496 256 496S496 388.549 496 256S388.547 16 256 16ZM256 448V64C361.869 64 448 150.131 448 256S361.869 448 256 448Z" />
    </svg>
  );
};

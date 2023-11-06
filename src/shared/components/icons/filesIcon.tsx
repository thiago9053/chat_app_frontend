import { FC } from "react";
import { IconProps } from "./core/iconType";

export const FilesIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={className}
    >
      <path d="M352 0V96H448L352 0ZM320 96V0H144C117.49 0 96 21.492 96 48V368C96 394.508 117.49 416 144 416H400C426.51 416 448 394.508 448 368V128H352C334.4 128 320 113.602 320 96ZM48 432V96C21.49 96 0 117.492 0 144V448C0 483.346 28.654 512 64 512H304C330.51 512 352 490.508 352 464H80C62.326 464 48 449.672 48 432Z" />
    </svg>
  );
};
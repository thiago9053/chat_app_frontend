import { FC } from "react";
import { IconProps } from "./core/iconType";

export const ShowPasswordIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      className={className}
    >
      <path
        d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM432 256.062C432 335.516 367.531 400 288.062 400H288C208.5 400 144 335.484 144 256S208.5 112 288 112S432 176.516 432 256V256.062ZM288 160H287.781C285.48 160.029 282.426 160.441 279.539 160.764C284.77 170.037 288 180.594 288 192C288 227.346 259.346 256 224 256C212.551 256 201.959 252.748 192.66 247.482C192.363 250.479 192 253.625 192 256C192 308.996 235.004 352 288 352S384 308.996 384 256S340.996 160 288 160Z"
        fill={fill}
      />
    </svg>
  );
};
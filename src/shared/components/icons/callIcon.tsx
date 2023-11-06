import { FC } from "react";
import { IconProps } from "./core/iconType";

export const CallIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        d="M345.125 107.992C334.906 99.648 319.781 101.086 311.344 111.334C302.937 121.584 304.437 136.707 314.687 145.113C348.562 172.891 368 213.293 368 255.977S348.562 339.062 314.688 366.842C304.438 375.246 302.938 390.371 311.344 400.619C316.094 406.4 322.969 409.4 329.906 409.4C335.281 409.4 340.656 407.619 345.125 403.963C390.156 367.061 416 313.098 416 255.977C416 198.857 390.156 144.895 345.125 107.992ZM406.375 33.154C396.156 24.812 381.031 26.281 372.594 36.498C364.188 46.748 365.688 61.871 375.938 70.275C431.906 116.115 464 183.797 464 255.977C464 328.158 431.906 395.838 375.938 441.678C365.688 450.084 364.188 465.207 372.594 475.457C377.344 481.236 384.219 484.236 391.156 484.236C396.531 484.236 401.906 482.455 406.375 478.799C473.5 423.805 512 342.594 512 255.977C512 169.361 473.5 88.15 406.375 33.154ZM158.812 205.967C179.375 208.311 198.594 196.404 206.125 177.469L236.781 101.008C244.969 80.416 237.25 56.949 218.469 45.232L157.219 7.018C139.031 -4.326 115.688 -1.732 100.531 13.453H100.5C35.688 78.135 0 164.268 0 255.977C0 347.703 35.688 433.852 100.531 498.562C109.406 507.406 121.094 512 132.875 512C141.219 512 149.656 509.688 157.188 505L218.406 466.785C237.156 455.1 244.906 431.664 236.75 410.854L206.094 334.328C198.531 315.58 179.375 303.863 159.031 305.926L130.438 308.738C121.875 274.178 121.875 237.729 130.438 203.139L158.812 205.967ZM90.312 342.359C93.906 352.891 103.906 359.639 115.406 358.451L161.562 352.266L193 426.039L134.438 464.566C78.688 408.947 48 334.859 48 255.992C48 177.656 78.281 104.086 133.25 48.592L192.188 83.213L163.75 158.236L115.406 153.424C104.094 152.314 93.938 159.018 90.312 169.533C71.25 225.277 71.281 286.646 90.312 342.359ZM284.562 181.922C274.281 173.578 259.156 175.047 250.812 185.328C242.406 195.576 243.906 210.701 254.188 219.105C265.5 228.355 272 241.791 272 255.977C272 270.164 265.5 283.6 254.188 292.85C243.906 301.254 242.406 316.377 250.812 326.627C255.531 332.439 262.437 335.438 269.375 335.438C274.719 335.438 280.125 333.658 284.562 330.033C307.094 311.598 320 284.631 320 255.977C320 227.324 307.094 200.357 284.562 181.922Z"
        fill={fill}
      />
    </svg>
  );
};

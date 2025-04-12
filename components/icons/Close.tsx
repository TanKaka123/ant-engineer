import * as React from "react";
import { SVGProps } from "react";

export const ICClose = (
  props: SVGProps<SVGSVGElement> & { backgroundColor?: string, color?: string }
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={props?.backgroundColor ?? "black"} d="M0 0h24v24H0z" />
    <path
      stroke={props?.color ?? "white"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7 17 9.9-9.9M7 7l9.9 9.9"
    />
  </svg>
);

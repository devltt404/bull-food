import { IconProps } from "@radix-ui/react-icons/dist/types";
import React from "react";

export type IconComponent =
  | React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

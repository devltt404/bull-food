import { FunctionComponent, RefObject } from "react";

export type HeroSectionComponent = FunctionComponent<{
  ctaRef: RefObject<HTMLDivElement>;
}>;

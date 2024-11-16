import { FunctionComponent, PropsWithChildren } from "react";

export type EventBadgeComponent = FunctionComponent<{
  going: number;
}>;

export type EventBadgeWrapperComponent = FunctionComponent<
  PropsWithChildren<{
    className?: string;
  }>
>;

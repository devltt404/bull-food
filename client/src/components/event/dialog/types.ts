import React, { FunctionComponent, ReactPortal } from "react";

export type EventDialogComponent = FunctionComponent<{
  id: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export type OverlayPortal = (props: PropsWithChildren<{}>) => ReactPortal;

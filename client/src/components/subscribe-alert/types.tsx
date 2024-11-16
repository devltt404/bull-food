import React from "react";

export type SubscribeAlertComponent = React.FunctionComponent<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
  errMessage: string;
}>;

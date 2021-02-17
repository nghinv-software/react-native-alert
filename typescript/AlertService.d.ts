/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { AlertViewProps } from "./AlertView";

export interface AlertServiceType {
  alert: (content: AlertViewProps) => void;
  close: () => void;
  closeAll: () => void;
}

interface AlertViewPropsType extends AlertViewProps {
  reference?: (data: AlertServiceType) => void;
}

export const Alert: AlertServiceType;

export declare function AlertService(props: AlertViewPropsType): JSX.Element;

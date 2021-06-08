/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { TextStyle, TextProps } from 'react-native';
export interface AlertMessageProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle,
}

export declare function AlertMessage(props: AlertMessageProps): JSX.Element;

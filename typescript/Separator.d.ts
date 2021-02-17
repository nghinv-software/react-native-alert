/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ViewStyle } from 'react-native';

export interface SeparatorProps {
  type?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  lineWidth?: Number;
  backgroundColor?: String;
}

export declare function Separator(props: SeparatorProps): JSX.Element;

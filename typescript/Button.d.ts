/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ViewStyle, TextStyle, TouchableOpacityProps, TextProps } from 'react-native';

export interface AlertButtonProps {
  title: String;
  onPress?: () => void;
  style?: ViewStyle;
  titleColor?: String;
  titleStyle?: TextStyle;
  disabled?: Boolean;
  btnProps?: TouchableOpacityProps;
  titleProps?: TextProps;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
}

export declare function AlertButton(props: AlertButtonProps): JSX.Element;

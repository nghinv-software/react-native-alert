/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { AlertButtonProps } from './Button';
import { AlertTitleProps } from './Title';
import { AlertMessageProps } from './Message';
import { SeparatorProps } from './Separator';
import { AlertTopViewProps } from './TopView';
import { AlertBottomViewProps } from './BottomView';

export type AlertAction = Array<{
  text: String;
  onPress?: () => void;
  onPressIn?: () => void;
  autoDismiss?: Boolean;
  style?: ViewStyle;
  titleColor?: String;
  titleStyle?: TextStyle;
  disabled?: Boolean;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
}>

interface OverlayProps {
  progress: Animated.SharedValue<Number>;
  onPress?: () => void;
  backgroundColor?: String;
  overlayOpacity?: Number;
  showStatusBar?: Boolean;
}

export interface AlertViewProps {
  /*
   * Use Modal from react-native. Default true 
   */
  nativeModal: Boolean;
  /*
   * Show/hide alert
   */
  visible: Boolean;
  setVisible: (value: Boolean) => void;
  title?: String;
  message?: String;
  actions?: AlertAction;
  /*
   * Width alert view
   */
  width?: Number | String;
  borderRadius?: Number;
  backgroundColor?: String;
  separatorColor?: String;
  onOpen?: () => void;
  onClose?: () => void;
  /*
   * Animation type when alert is opening. Default is spring
   */
  animationType?: 'spring' | 'timing';
  /*
   * Default = 1.05 on Ios and 1.02 on Android
   */
  scaleAnimationInit: Number;
  springAnimationConfig: Object;
  timingAnimationConfig: Object;
  avoidKeyboard: Boolean;
  renderContent?: React.FC;
  renderBackground?: React.FC;
  titleProps?: AlertTitleProps;
  messageProps?: AlertMessageProps;
  buttonProps?: AlertButtonProps;
  topViewProps?: AlertTopViewProps;
  bottomViewProps?: AlertBottomViewProps;
  zIndex?: Number | null;
  testIDAlert?: String;
  accessibilityLabelAlert?: String;
  showStatusBar?: Boolean;
  overlayProps?: OverlayProps;
}

interface AlertViewInterface extends React.FC<AlertViewProps> {
  Button: React.FC<AlertButtonProps>;
  Title: React.FC<AlertTitleProps>;
  Message: React.FC<AlertMessageProps>;
  Separator: React.FC<SeparatorProps>;
  TopView: React.FC<AlertTopViewProps>;
  BottomView: React.FC<AlertBottomViewProps>;
}

export const AlertView: AlertViewInterface;

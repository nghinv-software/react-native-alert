/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, TouchableOpacityProps, TextProps } from 'react-native';

export interface AlertButtonProps {
  title?: String;
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

Button.defaultProps = {
  titleColor: '#0066FF',
  disabled: false,
};

export default function Button(props?: AlertButtonProps) {
  const { title, onPress, style, titleColor, titleStyle, disabled, btnProps, titleProps, testIDButton, accessibilityLabelButton, testIDTitle, accessibilityLabelTitle } = props;
  return (
    <TouchableOpacity
      testID={testIDButton}
      accessibilityLabel={accessibilityLabelButton}
      {...btnProps}
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Text
        testID={testIDTitle}
        accessibilityLabel={accessibilityLabelTitle}
        {...titleProps}
        style={[
          styles.title,
          { color: titleColor },
          disabled && { opacity: 0.4 },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
  },
});

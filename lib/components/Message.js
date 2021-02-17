/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { TextStyle, Text, StyleSheet, TextProps } from 'react-native';

export interface AlertMessageProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle,
}

Message.defaultProps = {
  color: 'black',
};

export default function Message(props?: AlertMessageProps) {
  const { value, color, style, ...otherProps } = props;
  return (
    <Text
      {...otherProps}
      style={[styles.title, { color }, style]}
    >
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 6,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

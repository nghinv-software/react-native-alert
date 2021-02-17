/**
 * Created by nghinv on Tue Jan 12 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface AlertTopViewProps {
  style?: ViewStyle;
}

export default function TopView(props?: AlertTopViewProps) {
  const { children, style } = props;
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
});

/**
 * Created by nghinv on Tue Jan 12 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Separator from './Separator';

export interface AlertBottomViewProps {
  style?: ViewStyle;
  separatorColor?: String;
}

export default function BottomView(props?: AlertBottomViewProps) {
  const { children, style, separatorColor } = props;
  return (
    <>
      <Separator backgroundColor={separatorColor} />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
  },
});

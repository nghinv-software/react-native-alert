/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Platform, BackHandler } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import ModalCustom from './components/ModalCustom';
import Overlay, { OverlayProps } from './components/Overlay';
import Title, { AlertTitleProps } from './components/Title';
import Message, { AlertMessageProps } from './components/Message';
import Button, { AlertButtonProps } from './components/Button';
import Separator, { SeparatorProps } from './components/Separator';
import TopView, { AlertTopViewProps } from './components/TopView';
import BottomView, { AlertBottomViewProps } from './components/BottomView';
import { defaultSpringConfig, defaultTimingConfig, isNullOrUndefined } from './utils';

type AlertAction = Array<{
  text?: String;
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

export interface AlertViewProps {
  nativeModal?: Boolean;
  visible?: Boolean;
  setVisible?: (value: Boolean) => void;
  title?: String;
  message?: String;
  actions?: AlertAction;
  width?: Number | String;
  borderRadius?: Number;
  backgroundColor?: String;
  separatorColor?: String;
  onOpen?: () => void;
  onClose?: () => void;
  animationType?: 'spring' | 'timing';
  scaleAnimationInit?: Number;
  springAnimationConfig?: Object;
  timingAnimationConfig?: Object;
  avoidKeyboard?: Boolean;
  renderContent?: React.FC;
  renderMessage?: React.FC;
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
  timeDismiss?: Number;
  hasTextInput?: Boolean;
  KeyboardScrollComponent?: React.ReactNode;
}

interface AlertViewInterface extends React.FC<AlertViewProps> {
  Button: React.FC<AlertButtonProps>;
  Title: React.FC<AlertTitleProps>;
  Message: React.FC<AlertMessageProps>;
  Separator: React.FC<SeparatorProps>;
  TopView: React.FC<AlertTopViewProps>;
  BottomView: React.FC<AlertBottomViewProps>;
}

const SCALE_ANIMATION = Platform.OS === 'ios' ? 1.05 : 1.02;

function AlertViewComponent(props?: AlertViewProps, ref: React.Ref) {
  const {
    visible,
    setVisible,
    title,
    message,
    actions,
    width,
    borderRadius,
    backgroundColor,
    separatorColor,
    onOpen,
    onClose,
    animationType,
    springAnimationConfig,
    timingAnimationConfig,
    renderContent,
    renderMessage,
    renderBackground,
    nativeModal,
    avoidKeyboard,
    titleProps,
    messageProps,
    buttonProps,
    topViewProps,
    bottomViewProps,
    zIndex,
    testIDAlert,
    accessibilityLabelAlert,
    showStatusBar,
    overlayProps,
    scaleAnimationInit,
    timeDismiss,
    hasTextInput,
    KeyboardScrollComponent,
  } = props;
  const progress = useSharedValue(0);
  const scale = useSharedValue(scaleAnimationInit);
  const backHandler = useRef();
  const _mounted = useRef(false);
  const KeyboardScroll = hasTextInput ? KeyboardScrollComponent ? KeyboardScrollComponent : React.Fragment : React.Fragment;

  useEffect(() => {
    if (visible) {
      backHandler.current = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      if (animationType === 'timing') {
        progress.value = withTiming(1, timingAnimationConfig);
        scale.value = withTiming(1, timingAnimationConfig, () => {
          onOpen && runOnJS(onOpen)();
        });
      } else {
        progress.value = withSpring(1, springAnimationConfig);
        scale.value = withSpring(1, springAnimationConfig, () => {
          onOpen && runOnJS(onOpen)();
        });
      }
    }
  }, [visible]);

  useEffect(() => {
    _mounted.current = true;

    return () => {
      _mounted.current = false;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    close: () => {
      onDismissModal();
    },
  }));

  const handleBackButton = () => {
    return true;
  };

  const onDismissModal = useCallback((callback) => {
    if (backHandler.current) {
      backHandler.current.remove();
      backHandler.current = null;
    }

    if (!setVisible) {
      console.warn('setVisible is required');
    }

    progress.value = withTiming(0, { duration: timeDismiss, easing: Easing.linear }, () => {
      scale.value = SCALE_ANIMATION;
      runOnJS(oncancel)();
      if (callback) {
        runOnJS(callback)();
      }
    });
  }, []);

  const oncancel = useCallback(() => {
    _mounted.current && setVisible(false);
    onClose && onClose();
  }, [onClose]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        { scale: scale.value },
      ],
    };
  });

  return (
    <ModalCustom
      nativeModal={nativeModal}
      visible={visible}
      avoidKeyboard={avoidKeyboard}
      onDismiss={onDismissModal}
      zIndex={zIndex}
    >
      <Overlay {...overlayProps} showStatusBar={showStatusBar} progress={progress} />
      <KeyboardScroll>
        <View pointerEvents='box-none' style={styles.container}>
          <Animated.View
            testID={testIDAlert}
            accessibilityLabel={accessibilityLabelAlert}
            style={[styles.viewContent, { width, borderRadius, backgroundColor }, contentStyle]}
          >
            {
              renderBackground && (
                <View style={{ ...StyleSheet.absoluteFillObject, borderRadius, overflow: 'hidden' }}>
                  {typeof renderBackground === 'function' ? renderBackground() : renderBackground}
                </View>
              )
            }
            {
              renderContent ? renderContent() : (
                <>
                  <TopView {...topViewProps}>
                    {
                      !isNullOrUndefined(title) && <Title {...titleProps} value={title} />
                    }
                    {
                      !isNullOrUndefined(message) && <Message {...messageProps} value={message} />
                    }
                    {renderMessage?.()}
                  </TopView>
                  {
                    Array.isArray(actions) && (
                      <BottomView separatorColor={separatorColor} {...bottomViewProps}>
                        {
                          actions.map((btn, idx) => (
                            <React.Fragment key={String(idx)}>
                              {
                                idx > 0 && idx < actions.length && <Separator type='vertical' backgroundColor={separatorColor} />
                              }
                              <Button
                                {...buttonProps}
                                {...btn}
                                title={btn.text}
                                onPress={() => {
                                  btn.onPressIn && btn.onPressIn();
                                  if (btn.autoDismiss === false) {
                                    if (nativeModal) {
                                      setTimeout(() => {
                                        btn.onPress && btn.onPress();
                                      }, 150);
                                    } else {
                                      btn.onPress && btn.onPress();
                                    }
                                  } else {
                                    if (nativeModal) {
                                      onDismissModal();
                                      setTimeout(() => {
                                        btn.onPress && btn.onPress();
                                      }, 150);
                                    } else {
                                      onDismissModal(btn.onPress);
                                    }
                                  }
                                }}
                              />
                            </React.Fragment>
                          ))
                        }
                      </BottomView>
                    )
                  }
                </>
              )
            }
          </Animated.View>
        </View>
      </KeyboardScroll>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContent: {
    marginVertical: 5,
    marginHorizontal: 2,
    flexWrap: 'nowrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

const AlertView: AlertViewInterface = React.memo(forwardRef(AlertViewComponent));

AlertView.defaultProps = {
  visible: false,
  width: 270,
  borderRadius: 13,
  backgroundColor: 'white',
  animationType: 'spring',
  scaleAnimationInit: SCALE_ANIMATION,
  nativeModal: true,
  springAnimationConfig: defaultSpringConfig,
  timingAnimationConfig: defaultTimingConfig,
  timeDismiss: 100,
};

// Component Alert Button
AlertView.Button = Button;

// Component Alert Title
AlertView.Title = Title;

// Component Alert Message
AlertView.Message = Message;

// Component Alert Separator
AlertView.Separator = Separator;

// Component Alert TopView
AlertView.TopView = TopView;

// Component Alert BottomView
AlertView.BottomView = BottomView;

export default AlertView;

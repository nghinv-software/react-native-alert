/**
 * Created by nghinv on Mon Jan 11 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useEffect } from 'react';
import WrapAlertView from './WrapAlertView';
import WrapAlertViewNativeModal from './WrapAlertViewNativeModal';
import { AlertViewProps } from './AlertView';

export interface AlertServiceType {
  alert: (content: AlertViewProps) => void;
  close: () => void;
  closeAll: () => void;
}

interface AlertViewPropsType extends AlertViewProps {
  reference?: (data: AlertServiceType) => void;
}

// eslint-disable-next-line import/no-mutable-exports
let Alert: AlertServiceType;

export default function AlertService({ children, nativeModal = true, reference, ...defaultProps }: AlertViewPropsType) {
  useEffect(() => {
    reference && reference(Alert);
  }, [reference]);

  return (
    <>
      {children}
      {
        nativeModal ? (
          <WrapAlertViewNativeModal {...defaultProps} nativeModal={nativeModal} ref={ref => { Alert = ref; }} />
        ) : <WrapAlertView {...defaultProps} nativeModal={nativeModal} ref={ref => { Alert = ref; }} />
      }
    </>
  );
}

export { Alert };

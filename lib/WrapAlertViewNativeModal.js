/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import AlertView from './AlertView';

function WrapAlertViewNativeModal(props, ref) {
  const [visible, setVisible] = useState(false);
  const [alertContent, setAlertContent] = useState(undefined);
  const alertRef = useRef();

  useImperativeHandle(ref, () => ({
    alert: (content) => {
      setAlertContent({
        ...content,
        onClose: () => {
          content && content.onClose && content.onClose();
          setAlertContent(undefined);
        },
      });
      setVisible(true);
    },
    close: () => {
      alertRef.current.close();
    },
    closeAll: () => {
      alertRef.current.close();
    },
  }));

  return (
    <AlertView
      {...props}
      {...(alertContent || {})}
      nativeModal
      ref={alertRef}
      visible={visible}
      setVisible={setVisible}
    />
  );
}

export default React.memo(forwardRef(WrapAlertViewNativeModal));

/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback, useEffect } from 'react';
import AlertView from './AlertView';

function WrapAlertView(props, ref) {
  const [alertsContent, setAlertsContent] = useState([]);
  const alertRef = useRef({});
  const alertCount = useRef(0);
  const currentZIndex = useRef(undefined);

  const setVisible = useCallback((value, id) => {
    if (value) {
      setAlertsContent(currentAlerts => currentAlerts.map(alert => (alert.id === id ? { ...alert, visible: value } : alert)));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(alertsContent) && alertsContent.length === 0) {
      currentZIndex.current = undefined;
    }
  }, [alertsContent]);

  useImperativeHandle(ref, () => ({
    alert: (content) => {
      alertCount.current++;
      const id = alertCount.current;
      if (content && content.zIndex !== undefined) {
        currentZIndex.current = content.zIndex;
      }
      setAlertsContent(currentAlerts => currentAlerts.concat({
        ...content,
        id,
        visible: true,
        zIndex: currentZIndex.current,
        setVisible: (value) => setVisible(value, id),
        onClose: () => {
          content && content.onClose && content.onClose();
          setAlertsContent(alertsState => alertsState.filter(alert => alert.id !== id));
          alertCount.current--;
        },
      }));
    },
    close: () => {
      alertRef.current[alertCount.current] && alertRef.current[alertCount.current].close();
    },
    closeAll: () => {
      Object.keys(alertRef.current).forEach(alertKey => {
        alertRef.current[alertKey] && alertRef.current[alertKey].close();
      });
    },
  }), [alertCount.current]);

  return alertsContent.map((alert, idx) => {
    return (
      <AlertView
        {...props}
        {...alert}
        nativeModal={false}
        key={`${alert.id}_${idx}`}
        ref={refs => { alertRef.current[alert.id] = refs; }}
      />
    );
  });
}

export default React.memo(forwardRef(WrapAlertView));

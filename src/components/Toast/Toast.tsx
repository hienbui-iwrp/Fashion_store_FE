import React from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  title: string;
  content: string;
  type: NotificationType;
}

export default function Toast (props: ToastProps) {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    console.log('checkkkk')
    api[type]({
      message: props.title,
      description: props.content,
    });
  };
  console.log('check')

  return (
    <>
      {contextHolder}
      {openNotificationWithIcon(props.type)}
    </>
  );
}

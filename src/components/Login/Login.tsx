import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Toast from '../Toast';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  title: string;
  content: string;
  type: NotificationType;
}

const { Title, Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();
  
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (props: ToastProps) => {
    console.log('checkkkk')
    api[props.type]({
      message: props.title,
      description: props.content,
    });
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    openNotificationWithIcon({title:'Đăng nhập thành công', content:'', type:'success'})
    router.replace('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex items-center h-screen w-screen bg-[url("./../../public/bg-login.png")] bg-no-repeat bg-cover'>
      {contextHolder}
      <Form
        className='bg-gray-300 w-96 m-auto p-5 rounded-3xl'
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className='flex justify-between'>
          <Title level={2}>Đăng nhập</Title>
          <Link href='/register' className='flex'>
            <Text className='text-red-600 hover:text-red-400' strong={true}>Đăng ký</Text>
          </Link>
        </div>

        <Form.Item
          className='mb-2'
          label={<Text strong>Tên đăng nhập</Text>}
          name="username"
          rules={[
            { required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Mật khẩu</Text>}
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },
            ({}) => ({
              validator(_, value) {
                if (!value || value.length > 5) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu dài tối thiểu 6 ký tự'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item >
          <div className='flex justify-between'>
            <span></span>
            <Link href='/reset-password' className='flex'>
              <Text className='text-gray-900' strong>Quên mật khẩu?</Text>
            </Link>
          </div>
        </Form.Item>

        <Form.Item className='mb-0' wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonClientPrimary htmlType="submit" name='Đăng nhập' />
        </Form.Item>
      </Form>
    </div>
  );
};
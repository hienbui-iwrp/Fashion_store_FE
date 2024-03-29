import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Empty } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import { resetPasswordCustomerBFF } from '@/api';

const { Title, Text } = Typography;

export default function ResetPassword() {
  const router = useRouter()

  const resetPassword = async (username: string) => {
    return await resetPasswordCustomerBFF(username);
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    resetPassword(values.username)
      .then(res => {
        if (res?.StatusCode == 200) {
          router.push(`/reset-password/confirm-otp?username=${values.username}`)
        }
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex items-center h-screen w-screen bg-[url("./../../public/bg-login.png")] bg-no-repeat bg-cover'>
      <Form
        className='bg-gray-300 w-96 m-auto p-5 rounded-3xl'
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className='flex justify-around'>
          <Title level={2}>Tạo lại mật khẩu</Title>
        </div>

        <Form.Item
          className='mb-4'
          label={<Text strong>Tên đăng nhập</Text>}
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input className='' />
        </Form.Item>

        <Form.Item className='m-0' wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonClientPrimary htmlType="submit" name='Xác nhận' />
        </Form.Item>
      </Form>
    </div>
  );
};
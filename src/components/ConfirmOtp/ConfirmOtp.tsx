import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Empty } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import { confirmResetPasswordCustomerBFF } from '@/api';

const { Title, Text } = Typography;

export default function ConfirmOtp() {
  const router = useRouter();
  const { username } = router.query;
  const confirmOtp = async (otp: string) => {
    console.log(username, otp);
    return await confirmResetPasswordCustomerBFF(username as string, otp)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
    confirmOtp(values.otp)
      .then(res => {
        if (res?.StatusCode == 200) {
          router.push('/login')
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
          <Title level={2}>Xác nhận OTP</Title>
        </div>

        <Form.Item
          className='mb-4'
          label={<Text strong>Mã OTP</Text>}
          name="otp"
          rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
        >
          <Input className='' placeholder='Mã OTP' />
        </Form.Item>

        <Form.Item className='m-0' wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonClientPrimary htmlType="submit" name='Xác nhận' />
        </Form.Item>
      </Form>
    </div>
  );
};
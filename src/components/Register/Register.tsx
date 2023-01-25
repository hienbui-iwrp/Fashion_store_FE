import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Empty } from 'antd';
import Link from 'next/link';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';

const { Title, Text } = Typography;

export default function Register() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
        <div className='flex justify-between'>
          <Title level={2}>Đăng ký</Title>
          <Link href='/login' className='flex'>
            <Text className='text-red-600 hover:text-red-400' strong={true}>Đăng nhập</Text>
          </Link>
        </div>

        <Form.Item
          className='mb-2'
          label={<Text strong>Tên đăng nhập</Text>}
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Tên người dùng</Text>}
          name="username"
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Số điện thoại</Text>}
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Mật khẩu</Text>}
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className='mb-4'
          label={<Text strong>Nhập lại mật khẩu</Text>}
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className='m-0' wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonClientPrimary htmlType="submit" name='Đăng ký' />
        </Form.Item>
      </Form>
    </div>
  );
};
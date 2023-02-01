import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Empty } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';

const { Title, Text } = Typography;

export default function Register() {
  const router = useRouter()
  const onFinish = (values: any) => {
    console.log('Success:', values);
    router.push('/login');
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
          label={<Text strong>Email</Text>}
          name="email"
          rules={[
            { type: 'email', message: 'Định dạng email không đúng.' },
            { required: true, message: 'Vui lòng nhập email!' }
          ]}
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Tên người dùng</Text>}
          name="name"
        >
          <Input className='' />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label={<Text strong>Số điện thoại</Text>}
          name="phoneNumber"
          rules={[]}
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

        <Form.Item
          className='mb-4'
          label={<Text strong>Nhập lại mật khẩu</Text>}
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Nhập lại mật khẩu không đúng!'));
              },
            })
          ]}
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
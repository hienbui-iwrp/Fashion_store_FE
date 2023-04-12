import React, { useState } from 'react';
import { Typography, Input, Form } from 'antd'
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';

const { Title, Text } = Typography
export interface SupportProps {
}

export default function Support(props: SupportProps) {
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    router.push('/login');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="m-auto mt-2 max-w-[700px]">
      <Title level={4}>Hỗ trợ</Title>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className='mb-1'
          label={<Text strong>Tên</Text>}
          name="name"
          rules={[]}
        >
          <Input className='' placeholder='Tên người nhận' />
        </Form.Item>
        <Form.Item
          className='mb-1'
          label={<Text strong>Số điện thoại</Text>}
          name="phone"
          rules={[]}
        >
          <Input className='' placeholder='Số điện thoại' />
        </Form.Item>
        <Form.Item
          className='mb-1'
          label={<Text strong>Email</Text>}
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            {
              type: 'email',
              message: 'Email không đúng định dạng!',
            },
          ]}
        >
          <Input className='' placeholder='Email' />
        </Form.Item>
        <Form.Item
          className='mb-1'
          label={<Text strong>Thông tin cần hỗ sợ</Text>}
          name="info"
          rules={[
            { required: true, message: 'Vui lòng nhập thông tin mà bạn cần hỗ trợ!' }
          ]}
        >
          <Input.TextArea rows={4} placeholder='Những thông tin mà bạn cần hỗ trợ....' />
        </Form.Item>

        <div className="my-2 flex justify-center">
          <ButtonClientPrimary htmlType='submit' name='Gửi' />
        </div>
      </Form>
    </div>
  );
}

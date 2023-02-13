import React from 'react'
import { Result } from 'antd';
import Link from 'next/link';
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang hiện tại của bạn truy cập không tồn tại."
      extra={<Link href='/' className='flex justify-center'><ButtonClientPrimary name="Về trang chủ" /></Link> }
    />
  )
}
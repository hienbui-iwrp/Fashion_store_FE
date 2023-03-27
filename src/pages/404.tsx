import React from 'react'
import { Result } from 'antd'
import Link from 'next/link'
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { Routes } from '@/constants'

export default function NotFoundPage() {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, trang hiện tại của bạn truy cập không tồn tại.'
      extra={
        localStorage.getItem('logged') &&
        localStorage.getItem('logged') != 'false' &&
        localStorage.getItem('userRole') != '1' ? (
          <Link href={Routes.admin.homepage} className='flex justify-center'>
            <ButtonClientPrimary name='Về trang chủ' />
          </Link>
        ) : (
          <Link href={Routes.homepage} className='flex justify-center'>
            <ButtonClientPrimary name='Về trang chủ' />
          </Link>
        )
      }
    />
  )
}

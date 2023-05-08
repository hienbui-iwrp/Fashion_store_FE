import React, { use, useEffect, useState } from 'react'
import { Result } from 'antd'
import Link from 'next/link'
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { Routes } from '@/constants'

export default function NotFoundPage() {
  const [route, setRoute] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('logged') != 'false') {
        switch (localStorage.getItem('userRole')) {
          case '1':
            setRoute(Routes.homepage)
            break
          case '2':
            setRoute(Routes.admin.homepage)
            break
          case '3':
            setRoute(Routes.branchManager.homepage)
            break
          case '4':
            break
          case '5':
            break
          case '6':
            setRoute(Routes.branchLeader.homepage)
            break
        }
      }
    }
  }, [])
  // }, [localStorage.getItem('logged')])

  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, trang hiện tại của bạn truy cập không tồn tại.'
      extra={
        <Link href={route} className='flex justify-center'>
          <ButtonClientPrimary name='Về trang chủ' />
        </Link>
      }
    />
  )
}

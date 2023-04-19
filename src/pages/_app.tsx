import '@/styles/globals.css'
import { ConfigProvider, Image } from 'antd'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import LayoutClient from './../components/Layout/LayoutClient'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '@/redux/store'
import { selectNotification } from '@/redux/selectors'
import { useNotification } from '@/hooks'
import { useEffect } from 'react'
import {
  setNotificationType,
  setNotificationValue,
} from '@/redux/slices/notificationSlice'
import { Colors, Routes } from '@/constants'
import { LayoutAdmin } from '@/components'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    var now = new Date().getTime()
    var setupTime = localStorage.getItem('setupTime')
    // if (now - Number(setupTime) > 2 * 60 * 1000) {
    if (now - Number(setupTime) > 24 * 60 * 60 * 1000) {
      localStorage.clear()
    }
    if (!localStorage.getItem('logged')) {
      localStorage.setItem('logged', '')
    }
    if (
      router.pathname === Routes.cart ||
      router.pathname === Routes.payment ||
      router.pathname === Routes.manageOrders ||
      router.pathname === Routes.userInfo
    ) {
      if (localStorage.getItem('logged') === '') {
        router.replace('/login')
      }
    }
  }

  if (
    router.pathname === Routes.homepage ||
    router.pathname.startsWith(Routes.productsDetail) ||
    router.pathname.startsWith(Routes.manageOrdersDetail) ||
    router.pathname === Routes.products ||
    router.pathname === Routes.intro ||
    router.pathname === Routes.cart ||
    router.pathname === Routes.payment ||
    router.pathname === Routes.manageOrders ||
    router.pathname === Routes.userInfo ||
    router.pathname === Routes.man ||
    router.pathname === Routes.woman ||
    router.pathname === Routes.baby ||
    router.pathname === Routes.accessory ||
    router.pathname === Routes.support
  ) {
    return (
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: Colors.clientEmerald700,
            },
          }}
        >
          <Head>
            <link rel="icon" href="/logo.png" />
            <title> PTH Fashion</title>
          </Head>
          <LayoutClient>
            <Component {...pageProps} />
            <Notify />
          </LayoutClient>
        </ConfigProvider>
      </Provider>
    )
  }
  if (
    router.pathname === Routes.admin.homepage ||
    router.pathname === Routes.admin.branch ||
    router.pathname === Routes.admin.branchDetail ||
    router.pathname === Routes.admin.staff ||
    router.pathname === Routes.admin.staffDetail ||
    router.pathname === Routes.admin.staffRequest ||
    router.pathname === Routes.admin.statistic ||
    router.pathname === Routes.admin.account ||
    router.pathname === Routes.admin.accountDetail ||
    router.pathname === Routes.admin.event ||
    router.pathname === Routes.admin.eventDetail ||
    router.pathname === Routes.admin.warehouse ||
    router.pathname === Routes.admin.order ||
    router.pathname === Routes.admin.orderDetail ||
    router.pathname === Routes.admin.orderOnline ||
    router.pathname === Routes.admin.goods ||
    router.pathname === Routes.admin.goodsDetail ||
    router.pathname === Routes.admin.goodsTranfer
  )
    return (
      <Provider store={store}>
        <Head>
          <link rel="icon" href="/logo.png" />
          <title> PTH Fashion</title>
        </Head>
        <LayoutAdmin>
          <Component {...pageProps} />
          <Notify />
        </LayoutAdmin>
      </Provider>
    )

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title> PTH Fashion</title>
      </Head>
      <Component {...pageProps} />
      <Notify />
    </Provider>
  )
}

const Notify = () => {
  const notification = useSelector(selectNotification)
  const { openNotification, contextNotification } = useNotification({
    content: notification.value,
    type: notification.type,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.value != '') {
      dispatch(setNotificationValue(''))
      dispatch(setNotificationType('success'))
      openNotification()
    }
  }, [notification])

  return <>{contextNotification}</>
}

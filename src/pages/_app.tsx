import '@/styles/globals.css'
import { ConfigProvider } from 'antd'
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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (typeof window !== "undefined") {
    if (!localStorage.getItem('logged')) {
      localStorage.setItem('logged', '')
    }
    if (router.pathname === Routes.cart ||
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
    router.pathname.startsWith(Routes.login) ||
    router.pathname.startsWith(Routes.register) ||
    router.pathname.startsWith(Routes.resetPassword) ||
    router.pathname.startsWith(Routes.error)
  ) {
    return <Component {...pageProps} />
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
              colorPrimary: Colors.adminGreen700,
            },
          }}
        >
          <LayoutClient>
            <Component {...pageProps} />
          </LayoutClient>
        </ConfigProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
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

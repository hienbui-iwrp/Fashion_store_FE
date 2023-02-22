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
import { setNotificationValue } from '@/redux/slices/notificationSlice'
import { Colors } from '@/constants'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (
    router.pathname.startsWith('/login') ||
    router.pathname.startsWith('/register') ||
    router.pathname.startsWith('/reset-password') ||
    router.pathname.startsWith('/404')
  ) {
    return <Component {...pageProps} />
  }
  if (
    router.pathname === '/' ||
    router.pathname.startsWith('/products/') ||
    router.pathname.startsWith('/manage-orders/') ||
    router.pathname === '/products' ||
    router.pathname === '/intro' ||
    router.pathname === '/cart' ||
    router.pathname === '/payment' ||
    router.pathname === '/manage-orders' ||
    router.pathname === '/user-info' ||
    router.pathname === '/manage-orders' ||
    router.pathname === '/man' ||
    router.pathname === '/woman' ||
    router.pathname === '/baby' ||
    router.pathname === '/accessory' ||
    router.pathname === '/support'
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
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.value != '') {
      dispatch(setNotificationValue(''))
      openNotification()
    }
  }, [notification])

  return <>{contextNotification}</>
}

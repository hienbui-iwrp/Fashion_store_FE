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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (
    router.pathname.startsWith('/login') ||
    router.pathname.startsWith('/register') ||
    router.pathname.startsWith('/reset-password')
  ) {
    return <Component {...pageProps} />
  }
  if (!router.pathname.startsWith('/admin')) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6a983c',
          },
        }}
      >
        <LayoutClient>
          <Component {...pageProps} />
        </LayoutClient>
      </ConfigProvider>
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

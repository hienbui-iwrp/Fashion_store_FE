import '@/styles/globals.css'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import LayoutClient from './../components/Layout/LayoutClient'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname.startsWith('/login') || router.pathname.startsWith('/register') || router.pathname.startsWith('/reset-password')) {
    return (
      <Component {...pageProps} />
    )
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
    <Component {...pageProps} />
  )
}

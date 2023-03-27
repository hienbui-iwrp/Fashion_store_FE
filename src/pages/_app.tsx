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
import NotFoundPage from './404'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // if (typeof window !== 'undefined') {
  //   if (localStorage.getItem('logged')) {
  //     // Client
  //     if (
  //       localStorage.getItem('userRole') &&
  //       localStorage.getItem('userRole') == '0'
  //     ) {
  //       localStorage.setItem('userRole', '0')
  //       if (checkRouterCustomer(router.pathname)) {
  //         return (
  //           <Provider store={store}>
  //             <ConfigProvider
  //               theme={{
  //                 token: {
  //                   colorPrimary: Colors.adminGreen700,
  //                 },
  //               }}
  //             >
  //               <LayoutClient>
  //                 <Component {...pageProps} />
  //               </LayoutClient>
  //             </ConfigProvider>
  //           </Provider>
  //         )
  //       } else {
  //         router.replace(Routes.error)
  //         return <Component {...pageProps} />
  //       }
  //     }
  //     // Admin
  //     else {
  //       if (checkRouterAdmin(router.pathname)) {
  //         return (
  //           <Provider store={store}>
  //             <ConfigProvider
  //               theme={{
  //                 token: {
  //                   colorPrimary: Colors.adminGreen700,
  //                 },
  //               }}
  //             >
  //               <LayoutClient>
  //                 <Component {...pageProps} />
  //               </LayoutClient>
  //             </ConfigProvider>
  //           </Provider>
  //         )
  //       } else {
  //         router.replace(Routes.error)
  //         return <Component {...pageProps} />
  //       }
  //     }
  //   }
  //   // General
  //   else {
  //     localStorage.setItem('logged', '')
  //     if (checkRouterGeneral(router.pathname, router)) {
  //       return (
  //         <Provider store={store}>
  //           <LayoutAdmin>
  //             <Component {...pageProps} />
  //           </LayoutAdmin>
  //           <Notify />
  //         </Provider>
  //       )
  //     } else if (
  //       router.pathname.startsWith(Routes.login) ||
  //       router.pathname.startsWith(Routes.register) ||
  //       router.pathname.startsWith(Routes.resetPassword) ||
  //       router.pathname.startsWith(Routes.error)
  //     ) {
  //       return <Component {...pageProps} />
  //     } else {
  //       router.replace(Routes.error)
  //       return <Component {...pageProps} />
  //     }
  //   }
  // }

  if (typeof window !== 'undefined') {
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
  // if (
  //   router.pathname.startsWith(Routes.login) ||
  //   router.pathname.startsWith(Routes.register) ||
  //   router.pathname.startsWith(Routes.resetPassword) ||
  //   router.pathname.startsWith(Routes.error)
  // ) {
  // }

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
        <LayoutAdmin>
          <Component {...pageProps} />
          <Notify />
        </LayoutAdmin>
      </Provider>
    )

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

// const checkRouterCustomer = (route: string, router?: any) => {
//   return (
//     route === Routes.homepage ||
//     route.startsWith(Routes.productsDetail) ||
//     route.startsWith(Routes.manageOrdersDetail) ||
//     route === Routes.products ||
//     route === Routes.intro ||
//     route === Routes.cart ||
//     route === Routes.payment ||
//     route === Routes.manageOrders ||
//     route === Routes.userInfo ||
//     route === Routes.man ||
//     route === Routes.woman ||
//     route === Routes.baby ||
//     route === Routes.accessory ||
//     route === Routes.support
//   )
// }

// const checkRouterAdmin = (route: string, router?: any) => {
//   return (
//     route === Routes.admin.branch ||
//     route === Routes.admin.branchDetail ||
//     route === Routes.admin.staff ||
//     route === Routes.admin.staffDetail ||
//     route === Routes.admin.staffRequest ||
//     route === Routes.admin.statistic ||
//     route === Routes.admin.account ||
//     route === Routes.admin.accountDetail ||
//     route === Routes.admin.warehouse ||
//     route === Routes.admin.order ||
//     route === Routes.admin.orderDetail ||
//     route === Routes.admin.orderOnline ||
//     route === Routes.admin.goods ||
//     route === Routes.admin.goodsDetail ||
//     route === Routes.admin.goodsTranfer
//   )
// }

// const checkRouterGeneral = (route: string, router?: any) => {
//   if (
//     route === Routes.cart ||
//     route === Routes.payment ||
//     route === Routes.manageOrders ||
//     route === Routes.userInfo
//   ) {
//     console.log('asdadasd: ', route)
//     router.push('/login')
//   }
//   return (
//     route === Routes.homepage ||
//     route.startsWith(Routes.productsDetail) ||
//     route.startsWith(Routes.manageOrdersDetail) ||
//     route === Routes.products ||
//     route === Routes.intro ||
//     route === Routes.man ||
//     route === Routes.woman ||
//     route === Routes.baby ||
//     route === Routes.accessory ||
//     route === Routes.support
//   )
// }

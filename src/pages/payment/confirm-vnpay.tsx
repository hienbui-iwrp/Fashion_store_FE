import * as React from 'react';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import { setNotificationType, setNotificationValue, useAppDispatch } from '@/redux';
import { Routes } from '@/constants';
export interface PaymentConfirmPageProps {
}

export default function PaymentConfirmPage(props: PaymentConfirmPageProps) {
  const router = useRouter();
  let count = 0;
  const dispatch = useAppDispatch();
  const { vnp_ResponseCode } = router.query;
  if (vnp_ResponseCode) {
    if (vnp_ResponseCode == '00') {
      count++;
      if (count < 2) {
        if (window != undefined) {
          localStorage.setItem('orderStatus', 'true');
        }
        router.push(Routes.manageOrders);
      }
    } else {
      count++;
      if (count < 1) {
        dispatch(setNotificationType('error'));
        dispatch(setNotificationValue('Thanh toán thất bại, vui lòng thực hiện thanh toán lại'));
        router.push(Routes.cart);
      }
    }
  }
  return (
    <Loading />
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
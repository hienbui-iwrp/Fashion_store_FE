import * as React from 'react';
import CustomerOrderDetail from '@/components/CustomerOrderDetail';

export interface OrderDetailPageProps {
}

export default function OrderDetailPage(props: OrderDetailPageProps) {
  return (
    <CustomerOrderDetail />
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
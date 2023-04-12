import React from 'react'
import Products from '@/components/Products'
import { useRouter } from 'next/router';
import { GoodsGenderValue } from '@/constants';

export default function ProductsPage() {
  const router = useRouter();
  const { gender, type } = router.query;
  const listFilter: string[] = []
  console.log('gender', gender, 'type', type);
  if (gender || type) {
    //@ts-ignore
    gender ? listFilter.push(GoodsGenderValue[gender as string]) : null;
    type ? listFilter.push(type as string) : null;
  }
  return (
    <Products filter={listFilter} />
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
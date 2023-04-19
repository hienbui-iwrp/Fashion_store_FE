import React from 'react'
import Products from '@/components/Products'
import { useRouter } from 'next/router';
import { GoodsGenderValue } from '@/constants';

export default function ProductsPage() {
  const router = useRouter();
  const { gender, type, search } = router.query;
  const listFilter: string[] = []
  if (gender || type) {
    //@ts-ignore
    gender ? listFilter.push(GoodsGenderValue[gender as string]) : null;
    type ? listFilter.push(type as string) : null;
  }
  return (
    <Products filter={listFilter} search={search as string} />
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
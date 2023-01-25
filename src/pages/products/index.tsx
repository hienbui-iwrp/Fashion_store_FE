import React from 'react'
import Products from '@/components/Products'


const onSearch = (value: string) => console.log(value)

export default function ProductsPage() {
  return (
    <Products />
  )
}
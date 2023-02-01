import Head from 'next/head'
import type { AppProps } from 'next/app';
import styles from '@/styles/Homepage.module.css'
import React from 'react'
import { Layout, Col, Row, Image, Input } from 'antd'
import LayoutClient from './../components/Layout/LayoutClient'
import HomeClient from '@/components/HomeClient'

const { Header, Footer, Content } = Layout
const { Search } = Input
// Children must be rendered, otherwise the child routes cannot be displayed
// Here you can also set global provision
const onSearch = (value: string) => console.log(value)

export default function App() {
  return (
    <HomeClient />
  )
}

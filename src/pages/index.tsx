import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Homepage.module.css'
import React from 'react'
import { Layout, Col, Row, Image, Input } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ButtonHeader from '@/components/Button/ButtonHeader'
import LayoutClient from './../components/Layout/LayoutClient'

const { Header, Footer, Content } = Layout
const { Search } = Input
// Children must be rendered, otherwise the child routes cannot be displayed
// Here you can also set global provision
const onSearch = (value: string) => console.log(value)

export default function Home() {
  return (
    <>
      <Head>
        <title>PTH Fashion</title>
        <meta name='description' content='Fashion Store' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <LayoutClient>
          content
        </LayoutClient>
      </main>
    </>
  )
}

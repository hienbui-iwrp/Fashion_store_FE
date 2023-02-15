import Head from 'next/head'
import type { AppProps } from 'next/app';
import styles from '@/styles/Homepage.module.css'
import React from 'react'
import { Layout, Col, Row, Image, Input } from 'antd'
import HomeClient from '@/components/HomeClient'

// Children must be rendered, otherwise the child routes cannot be displayed
// Here you can also set global provision

export default function App() {
  return (
    <HomeClient />
  )
}

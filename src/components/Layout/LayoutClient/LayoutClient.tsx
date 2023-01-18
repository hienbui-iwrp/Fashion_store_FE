import React from 'react'
import { Layout, Col, Row, Image, Input, Menu } from 'antd'
import ButtonHeader from './../../Button/ButtonHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const { Header, Footer, Content } = Layout
const { Search } = Input
// Children must be rendered, otherwise the child routes cannot be displayed
// Here you can also set global provision
const onSearch = (value: string) => console.log(value)

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <Layout className='max-w-7xl m-auto p-0 height-auto'>
      <Header className="!bg-white !p-0">
        <Row className='flex'>
          <Col span={15} className="flex items-center">
            <Image width='150px' src='/logo_pth.png' preview={false} />
            <Search
              placeholder='input search text'
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col span={9} className='flex justify-around items-center'>
            <ButtonHeader name='Quản lý cửa hàng' />
            <ButtonHeader name='Giỏ hàng' iconInput={<FontAwesomeIcon icon={faCartShopping} />} />
            <ButtonHeader
              name='Đăng nhập'
              iconInput={<FontAwesomeIcon icon={faUser} />}
            />
          </Col>
        </Row>
        <Menu
          className='bg-[#F9F9F9]'
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

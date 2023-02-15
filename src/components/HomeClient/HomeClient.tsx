import * as React from 'react'
import { Carousel, Divider } from 'antd'
import FeaturedProducts from '../FeaturedProducts'

export interface HomeClientProps {}

const contentStyle: React.CSSProperties = {
  height: '260px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#eef',
}

export default function HomeClient(props: HomeClientProps) {
  return (
    <div>
      <Carousel autoplay className=' -mx-3 sm:-mx-6 md:-mx-14'>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>
      <div className=''>
        <FeaturedProducts name='SẢN PHẨM BÁN CHẠY NHẤT' />
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        <FeaturedProducts name='SẢN PHẨM MỚI' />
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        <FeaturedProducts name='THỜI TRANG NAM' />
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        <FeaturedProducts name='THỜI TRANG NỮ' />
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        <FeaturedProducts name='THỜI TRANG TRẺ EM' />
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        <FeaturedProducts name='PHỤ KIỆN' />
      </div>
    </div>
  )
}

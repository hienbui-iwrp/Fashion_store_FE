import * as React from 'react';
import { Carousel } from 'antd';
import FeaturedProducts from '../FeaturedProducts';


export interface HomeClientProps {
}

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function HomeClient(props: HomeClientProps) {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>
      <FeaturedProducts name='SẢN PHẨM BÁN CHẠY NHẤT' /> 
      <FeaturedProducts name='SẢN PHẨM MỚI' /> 
      <FeaturedProducts name='THỜI TRANG NAM' /> 
      <FeaturedProducts name='THỜI TRANG NỮ' /> 
      <FeaturedProducts name='THỜI TRANG TRẺ EM' /> 
      <FeaturedProducts name='PHỤ KIỆN' /> 
    </div>
  );
}

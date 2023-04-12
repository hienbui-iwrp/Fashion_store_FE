import * as React from 'react'
import { Carousel, Divider, Image } from 'antd'
import FeaturedProducts from '../FeaturedProducts'
import { getEventClientBff } from '@/api'
import { formatEventDataXML } from '@/utils'

export interface HomeClientProps { }

const contentStyle: React.CSSProperties = {
  height: '450px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#eef',
}

export default function HomeClient(props: HomeClientProps) {
  const [dataEvent, setDataEvent] = React.useState([]);

  const fetchEventData = async () => {
    await getEventClientBff()
      .then((res) => {
        console.log('???', res);
        if (res?.StatusCode === '200') {
          const tempData = res.Data.map((item: any) => formatEventDataXML(item));
          console.log('temp data:', tempData);
          setDataEvent(tempData);
        }
      })
  }

  React.useEffect(() => {
    fetchEventData();
  }, [])

  return (
    <div>
      <Carousel autoplay className=' -mx-3 sm:-mx-6 md:-mx-14 !rounded-xl'>
        {dataEvent.map((event: any) => {
          return (<div key={event.id}>
            <Image src={event.image} alt={event.name}
              style={{ width: '100vw', height: 400, borderRadius: 20 }} />
          </div>)
        })}
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

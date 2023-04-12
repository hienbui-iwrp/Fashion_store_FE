import * as React from 'react';
import { Col, Image, Row, Typography } from 'antd';
import { Colors } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruckFast,
  faHeadset,
  faCreditCard,
  faBoxesPacking
} from '@fortawesome/free-solid-svg-icons'

const { Text, Title, Paragraph } = Typography;

export interface IntroProps {
}

export default function Intro(props: IntroProps) {
  return (
    <div className='px-8'>
      {/* <div className='flex justify-center'>
        <Image src='/pth-fashion.png' className='shadow-lg' preview={false}
          style={{ maxWidth: 600, width: '100%', borderRadius: 20 }}
        />
      </div> */}
      <div className='flex justify-center'>
        <Image src='https://theme.hstatic.net/1000197303/1000796534/14/about-us-image.jpg?v=5446' className='shadow-lg' preview={false}
          style={{ width: '100%', maxHeight: 500, borderRadius: 20 }}
        />
      </div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, xl: 32 }}
          style={{ backgroundColor: Colors.clientGreen50 }}
          className={`p-4 mt-2 rounded-lg`}>
          <Col className="gutter-row" span={6}>
            <div className='flex flex-col'>
              <FontAwesomeIcon icon={faTruckFast} className='text-2xl' />
              <Text className='italic flex justify-center text-xl'>
                Miễn phí giao hàng
              </Text>
              <Paragraph className='text-centermt-2 px-2 flex justify-center text-base'>
                FREESHIP các đơn hàng từ 300.000 VND (khu vực TP.HCM).
                Giao hàng toàn quốc.
              </Paragraph>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='flex flex-col'>
              <FontAwesomeIcon icon={faHeadset} className='text-2xl' />
              <Text className='italic flex justify-center text-xl'>
                Hotline mua hàng
              </Text>
              <Paragraph className='text-centermt-2 px-2 flex justify-center text-base'>
                Liên hệ tư vấn và mua hàng 1900 258162 hoặc
                email sp.pfashion1@gmail.com.
              </Paragraph>
              <Paragraph className='px-2 flex justify-center text-base'>
                Thứ 2 - Chủ nhật (9h -21h).
              </Paragraph>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='flex flex-col'>
              <FontAwesomeIcon icon={faCreditCard} className='text-2xl' />
              <Text className='italic flex justify-center text-xl'>
                Thanh toán an toàn
              </Text>
              <Paragraph className='text-centermt-2 px-2 flex justify-center text-base'>
                Thanh toán linh hoạt: Tiền mặt khi nhận hàng, Chuyển khoản,
                Cổng thanh toán Momo, VNpay.
              </Paragraph>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='flex flex-col'>
              <FontAwesomeIcon icon={faBoxesPacking} className='text-2xl' />
              <Text className='italic flex justify-center text-xl'>
                Miễn phí đổi/trả hàng 30 ngày
              </Text>
              <Paragraph className='text-centermt-2 px-2 flex justify-center text-base'>
                Miễn phí đổi/trả hàng 30 ngày.
                Khách hàng hoàn toàn an tâm khi mua sắm.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
      <div className='mt-4 min-h-[250px] bg-[url("https://theme.hstatic.net/1000197303/1000796534/14/bg.jpg?v=5445")]'>
        <Title level={2} className='flex justify-center'>
          Giới thiệu về thương hiệu thời trang PTH Fashion
        </Title>
        <div className='flex justify-center'>
          <Image src='/pth-fashion.png' className='shadow-lg my-2' preview={false}
            style={{ maxWidth: 800, maxHeight: 400, width: '100%', borderRadius: 20 }}
          />
        </div>
        <Paragraph className='text-center m-auto max-w-3xl'>
          PTH Fashion là một thương hiệu thời trang nội địa, được thành lập tại vào năm 2022. Với những thiết kế độc đáo và đa dạng, PTH nhanh chóng trở thành một trong những thương hiệu thời trang lớn nhất và được yêu thích trên cả nước, là một cái tên gần gũi hơn với khách hàng.
          Với khơi nguồn từ lòng đam mê thời trang, khát khao mang đến cái đẹp cho tất cả phụ nữ và hơn thế nữa là mong muốn được góp phần tạo dựng hình ảnh mới lạ cho ngành công nghiệp thời trang Việt Nam.
        </Paragraph>
        <Paragraph className='text-center m-auto max-w-3xl'>
          Chắc chắn ý nghĩa đầu tiên của thời trang đối với con người đó chính là giúp tôn lên diện mạo bề ngoài của người mặc. Mỗi màu sắc, họa tiết, kiểu dáng, chất liệu vải,… khác nhau sẽ mang đến cho Quý cô sự lựa chọn hoàn hảo với diện mạo ấn tượng nhất. “Người đẹp vì lụa” cũng chính là vì thế.
          PTH mong muốn mang lại cho khách hàng những sản phẩm tốt nhất để các bạn không chỉ thể hiện cá tính bản thân mà còn lan toả nguồn năng lượng tích cực, mạnh mẽ đến xung quanh.
        </Paragraph>
        <Paragraph className='text-center m-auto max-w-3xl'>
          Thời trang cho ta thấy được cá tính, phong cách của mỗi người qua cách mà họ lựa chọn kiểu dáng trang phục cũng như cách phối đồ. Dù rằng, họ có đang ý thức được điều này hay không. Vì vậy, dù là bất cứ ai thì cũng nhất định đừng quên cho mình những outfit phù hợp để có thể khẳng định bản thân mình rõ ràng nhất.
        </Paragraph>
        <Paragraph className='text-center m-auto max-w-3xl'>
          PTH Fashion ở đây để giúp bạn tạo nên những hình mẫu đầy cá tính, thỏa sức sáng tạo và tự tin hơn về bản thân qua những trang phục mà chúng tôi cung cấp cho bạn.
          PTH Fashion hân hạnh phục vụ quý khách cùng với việc luôn luôn đảm bảo uy tín, chất lượng sản phẩm để giao đến cho quý khách hàng. Hiện tại Fashion có hàng hóa đa dạng với đầy đủ thể loại và sẵn sàng phục vụ quý khách nhanh chóng thông qua việc bán tại cửa hàng tại 268 Lý Thường Kiệt, phường 14, quận 10 và đặt hàng online trên website.
        </Paragraph>
      </div>
      <div>
        <Image src='https://theme.hstatic.net/1000197303/1000796534/14/bg-about-us.png?v=5446' alt='' preview={false} />
      </div>
      <div>
        <Title level={3} className='flex justify-center'>
          Đối tượng khách hàng
        </Title>
        <Paragraph className='text-center m-auto max-w-3xl'>
          Dù cho bạn là cô nàng mạnh mẽ, độc lập hay nàng thơ nhẹ nhàng, ngọt ngào thì PTH tin mình có thể đáp ứng nhu cầu mặc đẹp mỗi ngày của bạn. Bạn không cần thay đổi phong cách để chạy theo xu hướng, là một quý cô hiện đại, bạn hãy tận dụng thời trang để làm mới bản thân và tự mình tạo ra những nguồn năng lượng trẻ trung, tích cực.
        </Paragraph>
      </div>
      <Row gutter={32}>
        <Col span={15}>
          <Image src='/pth-clothe.png' alt='' className='rounded-xl' preview={false} />
        </Col>
        <Col span={9}>
          <Image src='https://theme.hstatic.net/1000197303/1000796534/14/fashion-image-right.jpg?v=5446'
            alt='' className='rounded-xl' preview={false} />
          <Title level={3} className='flex justify-center'>
            Các sản phẩm thời trang
          </Title>
          <Paragraph className='px-4'>
            Các mẫu thiết kế của PTH luôn mang đậm phong cách phóng khoáng và tự do. Sự kết hợp hài hoà giữa hai dòng thời trang basic và trendy khiến các thiết kế vừa mang tính tiện dụng, phù hợp với nhiều bối cảnh hằng ngày mà vẫn bắt kịp xu hướng mốt của năm.
          </Paragraph>
          <Paragraph className='px-4'>
            Không chỉ đem đến cho khách hàng những sản phẩm mang phong cách và kiểu dáng độc đáo mà còn giới thiệu đến khách hàng những sản phẩm đạt chất lượng tốt nhất. Các mẫu thiết kế được kiểm duyệt kĩ càng từ khâu chọn chất liệu, dựng mẫu và hoàn thiện.
          </Paragraph>
          <Paragraph className='px-4'>
            Chính vì thế, những thiết kế đến tay khách hàng luôn là những sản phẩm tinh tế nhất. Với đội ngũ chuyên nghiệp cùng sự kết hợp chặt chẽ và thống nhất của ban lãnh đạo, thương hiệu thời trang PTH hy vọng sẽ đáp ứng được sự yêu mến và tin cậy của quý khách hàng về dòng sản phẩm thời trang chất lượng cao.
          </Paragraph>

        </Col>
      </Row>
      {/* <div className='pt-2'>
        PTH Fashion là một thương hiệu thời trang nội địa, được thành lập tại vào năm 2022. Với những thiết kế độc đáo và đa dạng, PTH nhanh chóng trở thành một trong những thương hiệu thời trang lớn nhất và được yêu thích trên cả nước.
      </div>
      <div className='pt-2'>
        
        Một trong những lý do khiến thời trang trở thành một phần tất yếu của cuộc sống bởi đây chính là lựa chọn hàng đầu để chúng ta thể hiện ngôn ngữ riêng của chính mình. Cũng như con người, mỗi thiết kế, mỗi phụ kiện hay mỗi phần của thời trang đều mang những cá tính riêng, câu chuyện và một ý nghĩa riêng. Do đó, để nói lên tiếng nói riêng của bản thân, nhiều người lựa chọn cho mình thời trang như một cách thể hiện.
        Do đó, thời trang ngày nay không chỉ với mục đích đơn giản là “mặc”, mà nó còn thể hiện được tính cách cũng như lối sống của người mặc một cách chân thực nhất.
      </div>
      <div className='pt-2'>
        Thời trang cho ta thấy được cá tính, phong cách của mỗi người qua cách mà họ lựa chọn kiểu dáng trang phục cũng như cách phối đồ. Dù rằng, họ có đang ý thức được điều này hay không. Vì vậy, dù là bất cứ ai thì cũng nhất định đừng quên cho mình những outfit phù hợp để có thể khẳng định bản thân mình rõ ràng nhất.
      </div>
      <div className='py-2'>
        Fashion ở đây để giúp bạn tạo nên những hình mẫu đầy cá tính, thỏa sức sáng tạo và tự tin hơn về bản thân qua những trang phục mà chúng tôi cung cấp cho bạn.
        Fashion hân hạnh phục vụ quý khách cùng với việc luôn luôn đảm bảo uy tín, chất lượng sản phẩm để giao đến cho quý khách hàng. Hiện tại Fashion có hàng hóa đa dạng với đầy đủ thể loại và sẵn sàng phục vụ quý khách nhanh chóng thông qua việc bán tại cửa hàng tại 268 Lý Thường Kiệt, phường 14, quận 10 và đặt hàng online trên website.
      </div> */}
    </div>
  );
}

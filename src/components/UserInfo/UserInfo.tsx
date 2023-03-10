import React, { useEffect, useState } from 'react';
import { Typography, Input, Form, Space, Row, Col, Avatar, Button, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import Loading from '@/components/Loading'

const { Title, Text } = Typography
export interface UserInfoProps {
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function UserInfo(props: UserInfoProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    router.push('/login');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      // setLoading(true);
      // return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinishUpdatePassword = (values: any) => {
    console.log('Success:', values);
    router.push('/login');
  };

  const onFinishFailedUpdatePassword = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return (
    isLoading ? <Loading /> :
      <div className="px-8 mb-4">
        <Title level={4}>
          Th??ng tin c???a b???n
        </Title>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={15}>
              <Form.Item
                className='mb-1'
                label={<Text strong>T??n</Text>}
                name="name"
                rules={[]}
              >
                <Input className='' placeholder='T??n ng?????i nh???n' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>S??? ??i???n tho???i</Text>}
                name="phone"
                rules={[]}
              >
                <Input className='' placeholder='S??? ??i???n tho???i' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>Email</Text>}
                name="email"
                rules={[
                  { required: true, message: 'Vui l??ng nh???p email!' },
                  {
                    type: 'email',
                    message: 'Email kh??ng ????ng ?????nh d???ng!',
                  },
                ]}
              >
                <Input className='' placeholder='Email' />
              </Form.Item>
              <Button type='text' onClick={showModal}>
                <Text strong>?????i m???t kh???u</Text>
              </Button>
              <div className='mt-2'>
                <Title level={4}>?????a ch??? </Title>
                <Row gutter={8}>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>T???nh / Th??nh ph???</Text>}
                      name="province"
                      rules={[]}
                    >
                      <Input className='' placeholder='T???nh th??nh' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>Qu???n / huy???n</Text>}
                      name="district"
                      rules={[]}
                    >
                      <Input className='' placeholder='Qu???n huy???n' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>Ph?????ng / x??</Text>}
                      name="ward"
                      rules={[]}
                    >
                      <Input className='' placeholder='Ph?????ng x??' />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>S??? nh??, ???????ng</Text>}
                  name="road"
                  rules={[]}
                >
                  <Input className='' placeholder='S??? nh??, ???????ng' />
                </Form.Item>
                <div className="mt-2">
                  <ButtonClientPrimary htmlType='submit' name='C???p nh???t' />
                </div>
              </div>
            </Col>
            <Col span={9} className="flex justify-center items-center">
              <div>
                <Avatar size={128} src={<img src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} alt="avatar" />} />
                <Upload
                  className="avatar-uploader !flex justify-center mt-2"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                >
                  {fileList.length < 1 && 'C???p nh???t m???i'}
                </Upload>
              </div>
              {/* <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader !flex justify-center"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload> */}
            </Col>
          </Row>
        </Form>
        <Modal title="?????i m???t kh???u"
          open={isModalOpen}
          footer={null}
        >
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinishUpdatePassword}
            onFinishFailed={onFinishFailedUpdatePassword}
          >
            <Form.Item
              className='mb-2'
              label={<Text strong>M???t kh???u c??</Text>}
              name="oldPassword"
              rules={[{ required: true, message: 'Vui l??ng nh???p m???t kh???u!' },
              ({ }) => ({
                validator(_, value) {
                  if (!value || value.length > 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('M???t kh???u d??i t???i thi???u 6 k?? t???'));
                },
              }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className='mb-2'
              label={<Text strong>M???t kh???u</Text>}
              name="password"
              rules={[{ required: true, message: 'Vui l??ng nh???p m???t kh???u!' },
              ({ }) => ({
                validator(_, value) {
                  if (!value || value.length > 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('M???t kh???u d??i t???i thi???u 6 k?? t???'));
                },
              }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className='mb-4'
              label={<Text strong>Nh???p l???i m???t kh???u</Text>}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui l??ng nh???p l???i m???t kh???u!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Nh???p l???i m???t kh???u kh??ng ????ng!'));
                  },
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className='flex justify-end gap-2'>
              <Button type='default'
                onClick={handleCancel}
              >
                H???y
              </Button>
              <Button type='primary' className='bg-[#6A983C]' htmlType='submit'
              // onClick={handleOk}
              >
                X??c nh???n
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
  );
}

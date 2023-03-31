import React, { useEffect, useState } from 'react';
import { Typography, Input, Form, Space, Row, Col, Avatar, Button, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRouter } from 'next/router';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import Loading from '@/components/Loading'
import { useSelector } from 'react-redux';
import { selectUser, setNotificationType, setNotificationValue, useAppDispatch } from '@/redux';
import { updateCustomerInfoBff } from '@/api';

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
  const dispatch = useAppDispatch()
  const { info } = useSelector(selectUser);
  const onFinish = (values: any) => {
    console.log('Success:', values);
    updateUserInfo(values);
  };
  const updateUserInfo = async (userData: any) => {
    console.log('new data', { ...info, ...userData });
    return updateCustomerInfoBff({ ...info, ...userData })
      .then((res) => {
        if (res?.StatusCode === '200') {
          dispatch(setNotificationValue('Cập nhật thông tin thành công'));
          router.push('/user-info');
        }
        else {
          dispatch(setNotificationType('error'));
          dispatch(setNotificationValue('Có lỗi xảy ra, thay đổi thông tin thất bại'));
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [loading, setLoading] = useState(true);
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

  const formRef = React.useRef(null);

  useEffect(() => {
    if (formRef.current) {
      console.log('object yes');
      for (let field in info) {
        //@ts-ignore
        formRef.current.setFieldValue(field, info[field]);
      }
    }
    setIsLoading(false);
  }, [info])

  return (
    isLoading ? <Loading /> :
      <div className="px-8 mb-4">
        <Title level={4}>
          Thông tin của bạn
        </Title>
        <Form
          name="basic"
          layout="vertical"
          ref={formRef}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={15}>
              <Form.Item
                className='mb-1'
                label={<Text strong>Tên</Text>}
                name="name"
                rules={[]}
              >
                <Input className='' placeholder='Tên người dùng' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>Số điện thoại</Text>}
                name="phone"
                rules={[]}
              >
                <Input className='' placeholder='Số điện thoại' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>Email</Text>}
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  {
                    type: 'email',
                    message: 'Email không đúng định dạng!',
                  },
                ]}
              >
                <Input className='' placeholder='Email' />
              </Form.Item>
              <Button type='text' onClick={showModal}>
                <Text strong>Đổi mật khẩu</Text>
              </Button>
              <div className='mt-2'>
                <Title level={4}>Địa chỉ </Title>
                <Row gutter={8}>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>Tỉnh / Thành phố</Text>}
                      name="province"
                      rules={[]}
                    >
                      <Input className='' placeholder='Tỉnh thành' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>Quận / huyện</Text>}
                      name="district"
                      rules={[]}
                    >
                      <Input className='' placeholder='Quận huyện' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className='mb-1'
                      label={<Text strong>Phường / xã</Text>}
                      name="ward"
                      rules={[]}
                    >
                      <Input className='' placeholder='Phường xã' />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>Số nhà, đường</Text>}
                  name="street"
                  rules={[]}
                >
                  <Input className='' placeholder='Số nhà, đường' />
                </Form.Item>
                <div className="mt-2">
                  <ButtonClientPrimary htmlType='submit' name='Cập nhật' />
                </div>
              </div>
            </Col>
            <Col span={9} className="flex justify-center items-center">
              <div>
                <Avatar size={128} src={<img src={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'} alt="avatar" />} />
                <Upload
                  className="avatar-uploader !flex justify-center mt-2"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                >
                  {fileList.length < 1 && 'Cập nhật mới'}
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
        <Modal title="Đổi mật khẩu"
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
              label={<Text strong>Mật khẩu cũ</Text>}
              name="oldPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },
              ({ }) => ({
                validator(_, value) {
                  if (!value || value.length > 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu dài tối thiểu 6 ký tự'));
                },
              }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className='mb-2'
              label={<Text strong>Mật khẩu</Text>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },
              ({ }) => ({
                validator(_, value) {
                  if (!value || value.length > 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu dài tối thiểu 6 ký tự'));
                },
              }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className='mb-4'
              label={<Text strong>Nhập lại mật khẩu</Text>}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Nhập lại mật khẩu không đúng!'));
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
                Hủy
              </Button>
              <Button type='primary' className='bg-[#6A983C]' htmlType='submit'
              // onClick={handleOk}
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
  );
}

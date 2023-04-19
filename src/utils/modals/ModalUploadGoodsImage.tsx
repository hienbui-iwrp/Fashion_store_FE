import React, { useEffect, useMemo, useState } from 'react'
import { AddButton, DropdownButton } from '@/components'
import { ModalUploadGoodsImageProps } from '../types'
import { Button, Checkbox, Form, Modal, Space } from 'antd'
import { CheckOutlined, FileImageOutlined } from '@ant-design/icons'
import Upload, { UploadFile, UploadProps } from 'antd/lib/upload'
import { Colors } from '@/constants'
import { uploadGoodsImageBff } from '@/api'

export const ModalUploadGoodsImage = (props: ModalUploadGoodsImageProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [listColor, setListColor] = useState<string[]>()
  const [form] = Form.useForm()

  useEffect(() => setListColor(props.extraData?.colors), [props?.extraData])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      form.setFieldValue('image', true)
      setFileList(newFileList)
    } else {
      form.setFieldValue('image', undefined)
    }
  }

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      let success = true
      fileList.forEach(async (file) => {
        await uploadGoodsImageBff({
          goodsId: props.extraData?.id,
          goodsColor: values.color,
          isDefault: values.isDefault ?? false,
          file: file.originFileObj,
        })
          .then((res: any) => {
            console.log('res: ', res)
            if (res.StatusCode == 200) {
              console.log('upload success:')
            }
          })
          .catch((err) => {
            success = false
            console.log('upload error')
          })
      })
      if (success) {
        props?.callback && props?.callback(fileList)
        props?.cancel()
      }
    } catch {}
  }

  return (
    <>
      <Modal
        title={props.extraData ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
        style={{ maxWidth: '90%' }}
        width={400}
        footer={[
          <Space key={'space'}>
            <AddButton
              key='upload'
              label='Lưu'
              icon={<CheckOutlined />}
              onClick={() => {
                onSave()
              }}
            />
          </Space>,
        ]}
      >
        <Form layout={'vertical'} form={form}>
          <Form.Item
            label='Màu sắc'
            name='color'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập',
              },
            ]}
          >
            <DropdownButton
              label={'Màu sắc'}
              callback={(item: any) => {
                form.setFieldValue('color', item)
              }}
              items={listColor?.map((item: any) => item)}
            />
          </Form.Item>
          <Form.Item name='isDefault'>
            <Checkbox
              onChange={(item) => {
                form.setFieldValue('isDefault', item.target.checked)
              }}
            >
              Đặt làm mặc định
            </Checkbox>
          </Form.Item>
          <Form.Item
            name='image'
            rules={[
              {
                required: true,
                message: 'Vui lòng thêm ảnh',
              },
            ]}
          >
            <Upload
              listType='picture-card'
              fileList={fileList}
              onChange={handleChange}
            >
              <Button
                icon={<FileImageOutlined style={{ padding: 0 }} />}
                style={{
                  height: '100%',
                  width: '100%',
                  padding: 0,
                  backgroundColor: Colors.adminGreen900,
                  color: Colors.white,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Thêm ảnh
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

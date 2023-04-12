import React, { useEffect, useState } from 'react'
import { AddButton, DropdownButton } from '@/components'
import { ModalSampleProps, ModalUploadGoodsImageProps } from '../types'
import { Button, Modal, Space } from 'antd'
import {
  CheckOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/lib/upload'
import { Colors } from '@/constants'
import { uploadGoodsImageBff } from '@/api'

export const ModalUploadGoodsImage = (props: ModalUploadGoodsImageProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [listColor, setListColor] = useState<string[]>()
  const [curColor, setCurColor] = useState<string>()

  useEffect(() => setListColor(props.extraData?.colors), [props?.extraData])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log('image: ', fileList)
    setFileList(newFileList)
  }

  const onSave = () => {
    if (curColor)
      fileList.forEach(async (file) => {
        await uploadGoodsImageBff({
          goodsId: props.extraData?.id,
          goodsColor: curColor,
          isDefault: false,
          file: file.originFileObj,
        }).then((res) => {
          props?.callback && props?.callback({})
          props?.cancel()
        })
      })
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
        <div className='mb-4'>
          <DropdownButton
            label={'Màu sắc'}
            callback={(item: any) => {
              setCurColor(item)
            }}
            items={listColor?.map((item: any) => item)}
          />
        </div>
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
      </Modal>
    </>
  )
}

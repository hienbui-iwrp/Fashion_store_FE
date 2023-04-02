import { BranchProps, GoodsProps, StaffProps } from './assetType'
export interface ModalSampleProps {
  open: boolean
  cancel: () => void
  extraData?: object
  callback?: (item: any) => void
  render?: boolean
  setRender?: (item: boolean) => void
}

export interface ModalAddEditBranchProps extends ModalSampleProps {
  extraData?: BranchProps
}

export interface ModalAddEditStaffProps extends ModalSampleProps {
  extraData?: StaffProps
}

export interface ModalStaffDetailProps extends ModalSampleProps {
  extraData?: StaffProps
}

export interface ModalOrderDetailProps extends ModalSampleProps {
  extraData?: {
    id: string
    status: string
    total: number
    createdDate: Date
    goods: { id: string; name: string; price: number; quantity: number }[]
    tax: number
  }
}

export interface ModalAllGoodsProps extends ModalSampleProps {
  extraData?: GoodsProps[]
  single?: boolean
}

export interface ModalAddEditWarehouseProps extends ModalSampleProps {
  extraData?: {
    id?: string
    name?: string
    street?: string
    ward?: string
    district?: string
    province?: string
    capacity?: string
    empty?: string
    manager?: string
    staff?: number
    createdDate?: Date
  }
}

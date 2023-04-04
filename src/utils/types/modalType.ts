import {
  BranchProps,
  GoodsProps,
  StaffProps,
  WarehouseProps,
} from './assetType'
export interface ModalSampleProps {
  open: boolean
  cancel: () => void
  extraData?: object
  callback?: (item: any) => void
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
  allGoods?: GoodsProps[]
}

export interface ModalAddEditWarehouseProps extends ModalSampleProps {
  extraData?: WarehouseProps
}

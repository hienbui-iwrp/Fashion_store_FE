export interface ModalSampleProps {
  open: boolean
  cancel: () => void
  extraData?: object
  callback?: (item: any) => void
}

export interface ModalAddEditBranchProps extends ModalSampleProps {
  extraData?: {
    name?: string
    address?: string
    openTime?: Date
    closeTime?: Date
    image?: string
  }
}

export interface ModalAddEditStaffProps extends ModalSampleProps {
  extraData?: {
    id?: string
    name?: string
    citizenId?: string
    phone?: string
    address?: string
    dateOfBirth?: Date
    homeTown?: string
    workingLocation?: string
    role?: string
    salary?: number
    startDate?: Date
    account?: string
  }
}

export interface ModalStaffDetailProps extends ModalSampleProps {
  extraData?: {
    id?: string
    name?: string
    citizenId?: string
    phone?: string
    address?: string
    dateOfBirth?: Date
    homeTown?: string
    workLocation?: string
    role?: string
    salary?: number
    startDate?: Date
    account?: string
  }
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
  extraData?: {
    id: string
    name?: string
    cost?: number
    price?: number
    supplier?: string
    gender?: string
    type?: string
    age?: string
    color: string
    size: string
    image?: string[]
  }[]
}

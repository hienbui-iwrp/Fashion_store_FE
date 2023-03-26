export interface AccountProps {
  id: string
  username: string
  role: number
  phoneNumber: string
  startDate: Date
  street: string
  ward: string
  district: string
  province: string
  name: string
  isActivated: boolean
  createdAt: Date
}

export interface CustomerInfoProps {
  customerId: string
  name?: string
  phoneNumber?: string
  username: string
  email: string
  street?: string
  ward?: string
  district?: string
  province?: string
}

export interface CustomerAddProps {
  name?: string
  phoneNumber?: string
  username: string
  password: string
  email: string
  role: string
}

export interface SvgIcon {
  size?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export interface ProductsDataProps {
  totalProducts: number
  listProduct: ProductDetailDataProps[]
}
export interface ProductDetailDataProps {
  goodsId: string
  name: string
  unitPrice: number
  price: number
  images: string[]
  quantity: number
  size: string[]
  color: string[]
  discount: number
  type: string
  gender: string
  age: string
  description: string
}

export interface ProductInCartProps {
  goodsId: string
  name: string
  unitPrice: number
  price: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number
}

export interface OrderProps {
  orderId: string
  isCompleted: boolean
  paymentMethod: string //
  listGoods: ProductInCartProps[]
  totalGoods: number
  totalPrice: number
  totalDiscount: number
  shipFee: number
  statusShips: StatusShip[]
  transactionDate: string
}

export interface OrderDetailProps {
  orderId: string
  isCompleted: boolean
  paymentMethod: string //
  status: number
  listGoods: ProductInCartProps[]
  totalGoods: number
  totalPrice: number
  totalOrder: number
  totalDiscount: number
  shipFee: number
  statusShips: StatusShip[]
  transactionDate: string
  nameReceiver: string
  phoneReceiver: string
  address: AddressProps
}

export interface AddressProps {
  province: string
  district: string
  ward: string
  street: string
}

export interface StatusShip {
  status: string
  time: string
}

export type BranchProps = {
  id?: string
  name?: string
  street?: string
  ward?: string
  district?: string
  province?: string
  createdAt?: Date
  manager?: string
  openTime?: Date
  closeTime?: Date
  image?: string
  staff?: number
}

export type StaffProps = {
  id?: string
  name?: string
  citizenId?: string
  phone?: string
  street?: string
  ward?: string
  district?: string
  province?: string
  birthdate?: Date
  hometown?: string
  branchId?: string
  role?: string
  salary?: number
  startDate?: Date
  account?: string
  status?: string
  email?: string
  gender?: string
}

export type AttendanceProps = {
  date?: Date
  checkIn?: Date
  checkOut?: Date
}

export type RequestProps = {
  id: string
  staffId: string
  status: string
  type: string
  date: Date
}

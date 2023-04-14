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
  name?: string
  phone?: string
  username: string
  gender?: string
  age?: number
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

export interface QuantityObj {
  quantity: number
  color: string
  size: string
}

export interface ProductDetailDataProps {
  goodsId: string
  name: string
  unitPrice: number
  price: number
  images: string[]
  listQuantity: QuantityObj[]
  // quantity: number
  // size: string[]
  // color: string[]
  discount: number
  type: string
  gender: string
  age: string
  description: string
}

export interface CartProps {
  cartId: string
  productsInCart: ProductInCartProps[]
}

export interface ProductInCartProps {
  goodsId: string
  name: string
  unitPrice: number
  price: number
  image: string
  quantity: number
  maxQuantity?: number
  goodsSize: string
  goodsColor: string
  discount: number
}

export interface OrderProps {
  orderId: string
  orderCode: string
  isCompleted: boolean
  paymentMethod: string //
  listGoods: ProductInCartProps[]
  totalGoods: number
  totalPrice: number
  totalOrder: number
  totalDiscount: number
  shipFee: number
  statusShips: StatusShip[]
  transactionDate: string
}

export interface OrderDetailProps {
  orderId: string
  orderCode: string
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
  expectDate: string
  nameReceiver: string
  phoneReceiver: string
  emailReceiver: string
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

export type EventProps = {
  id?: string
  name?: string
  discount?: number
  startTime?: Date
  endTime?: Date
  image?: string
  goods?: string[]
}

export type GoodsProps = {
  id: string
  classify: GoodsClassifyProps[]
  name: string
  type: string
  gender: string
  age: string
  supplier: string
  isSale: boolean
  price: string
  description: string
  cost: string
  image?: string[]
}

export type GoodsInWarehouseProps = {
  id: string
  size: string
  color: string
  quantity: number
  createdDate: Date
  updateDate?: Date
  warehouseId: string
}

export type GoodsClassifyProps = {
  id?: string
  size?: string
  color?: string
}

export type WarehouseProps = {
  id: string
  name: string
  street: string
  ward: string
  district: string
  province: string
  capacity: string
  createdDate: Date
}

export type Paging = {
  pageSize: number
  offset: number
}

export type OrderAdminData = {
  id: string
  publicId: string
  goods: GoodsOrderAdminData[]
  price: number
  totalDiscount: number
  totalGoods: number
  totalPrice: number
  transactionDate: Date
  onlineData?: OnlineOrderAdminData
  offlineData?: OfflineOrderAdminData
  isOnline?: boolean
}

export interface GoodsOrderAdminData extends ProductInCartProps {
  tax: number
}

export type OnlineOrderAdminData = {
  paymentMethod: string
  customerId: string
  isCompleted: string
  shipFee: string
  expectDate: Date
  status: number
  nameReceiver: string
  phoneReceiver: string
  emailReceiver: string
  address: AddressProps
}

export type OfflineOrderAdminData = {
  staffId: string
  branchhId: string
}

export type StatisticData = {
  revenue?: number
  profit?: number
  date: Date
}

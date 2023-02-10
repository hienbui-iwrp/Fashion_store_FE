export interface AccountProps {
  ID: string
  Username: string
  Password: string
  Email: string
  Role: String
  UserId: string
}

export interface UserProps {
  ID?: string
  name?: string
  phoneNumber?: string
  username: string
  password: string
  email: string
  address?: string
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
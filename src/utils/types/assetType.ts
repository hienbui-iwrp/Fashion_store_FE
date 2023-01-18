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

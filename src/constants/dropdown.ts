export const Gender = [
  { content: 'Nam', value: 'MALE' },
  { content: 'Nữ', value: 'FEMALE' },
  { content: 'Không xác định', value: 'UNDEFINED' },
]

export const StaffStatus = {
  pending: 'PENDING',
  approved: 'APPROVED',
  deleted: 'DELETED',
}

export const StaffRole = [
  { content: 'Quản trị viên', value: 2 },
  { content: 'Quản lý chi nhánh', value: 3 },
  { content: 'Quản lý kho', value: 4 },
  { content: 'Quản lý hàng', value: 5 },
  { content: 'Trưởng chi nhánh', value: 6 },
  { content: 'Nhân viên', value: 7 },
]

export const RequestStatus = {
  pending: 'PENDING',
  approved: 'APPROVED',
  unApproved: 'UNAPPROVED',
}

export const RequestType = {
  add: 'ADD',
  delete: 'DELETE',
}

export const GoodsGenders = [
  { value: '1', label: 'Nam' },
  { value: '2', label: 'Nữ' },
  { value: '3', label: 'Unisex' },
]

export const GoodsAccessory = [
  { value: 'ring', label: 'Nhẫn' },
  { value: 'hat', label: 'Nón' },
  { value: 'bag', label: 'Túi/balo' },
]

export const GoodsFootwear = [
  { value: 'sport Shoes', label: 'Giày thể thao' },
  { value: 'western shoes', label: 'Giày tây' },
  { value: 'sandal', label: 'Dép' },
]

export const GoodsClothes = [
  { value: 'jacket', label: 'Áo khoác' },
  { value: 'sweater', label: 'Áo len' },
  { value: 'T-shirt', label: 'Áo thun' },
  { value: 'dress', label: 'Váy' },
  { value: 'Trousers', label: 'Quần tây' },
  { value: 'kaki', label: 'Quần kaki' },
  { value: 'short', label: 'Quần sọt' },
  { value: 'shirt', label: 'Áo sơ mi' },
]

export const GoodsTypes = [...GoodsClothes, ...GoodsFootwear, ...GoodsAccessory]

export const GoodsSizes = [
  { value: '31', label: '31' },
  { value: '32', label: '32' },
  { value: '33', label: '33' },
  { value: '34', label: '34' },
  { value: '35', label: '35' },
  { value: '36', label: '36' },
  { value: '37', label: '37' },
  { value: '38', label: '38' },
  { value: '39', label: '39' },
  { value: '40', label: '40' },
  { value: '41', label: '41' },
  { value: '42', label: '42' },
  { value: '43', label: '43' },
  { value: '44', label: '44' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
  { value: 'XXXL', label: 'XXXL' },
]

export const GoodsAges = [
  { value: 'KID', label: 'Trẻ em' },
  { value: 'ADULT', label: 'Người lớn' },
  { value: 'ALL', label: 'Mọi lứa tuổi' },
]

export const GoodsOptions = [
  ...GoodsGenders,
  ...GoodsSizes,
  ...GoodsTypes,
  ...GoodsAges,
]

export const ShipStatus = [
  {
    value: 0,
    label: 'Chuẩn bị hàng',
  },
  {
    value: 1,
    label: 'Chờ lấy hàng',
  },
  {
    value: 2,
    label: 'Đang giao',
  },
  {
    value: 3,
    label: 'Đã giao',
  },
]

export const GoodsGenderValue = {
  man: '1',
  woman: '2',
  unisex: '3',
}
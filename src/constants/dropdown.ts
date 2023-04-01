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

// export const StaffRole = {
//   admin: 'Quản trị viên', //2
//   branch: 'Quản lý chi nhánh', //3
//   warehouse: 'Quản lý kho', //4
//   goods: 'Quản lý hàng hóa', //5
//   branchLead: 'Trưởng chi nhánh', //6
//   normal: 'Nhân viên', //7
//   // staff: 'Quản lý nhân viên', //
// }

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

export const goodsGenders = [
  { value: 'man', label: 'Nam' },
  { value: 'woman', label: 'Nữ' },
  { value: 'unisex', label: 'Unisex' },
]

export const goodsTypes = [
  { value: 'jacket', label: 'Áo khoác' },
  { value: 'sweater', label: 'Áo len' },
  { value: 'T-shirt', label: 'Áo thun' },
  { value: 'Trousers', label: 'Quần tây' },
  { value: 'kaki', label: 'Quần kaki' },
  { value: 'short', label: 'Quần sọt' },
  { value: 'sport Shoes', label: 'Giày thể thao' },
  { value: 'western shoes', label: 'Giày tây' },
  { value: 'sandal', label: 'Dép' },
  { value: 'ring', label: 'Nhẫn' },
  { value: 'hat', label: 'Nón' },
  { value: 'bag', label: 'Túi/balo' },
]

export const goodsSizes = [
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

export const goodsAges = [
  { value: 'baby', label: 'Trẻ em' },
  { value: 'adult', label: 'Trưởng thành' },
  { value: 'older', label: 'Người cao tuổi' },
]

export const goodsOptions = [
  goodsGenders, ...goodsSizes, ...goodsTypes, ...goodsAges
]
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

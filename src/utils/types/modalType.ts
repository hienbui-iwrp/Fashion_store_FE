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
    startTime?: Date
    endTime?: Date
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

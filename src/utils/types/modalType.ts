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

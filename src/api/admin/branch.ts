import { apiBranchService, BranchProps, formatTime } from '@/utils'

export const getBranch = async () => {
  return await apiBranchService
    .get('')
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getBranchDetail = async (id: any) => {
  return await apiBranchService
    .get(`/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const addBranch = async (branch: BranchProps) => {
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(branch?.openTime) + ':00',
    Close: branch?.closeTime && formatTime(branch?.openTime) + ':00',
  }
  return await apiBranchService
    .post(`/`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateBranch = async (id: any, branch: any) => {
  const openTime = new Date(branch?.openTime ?? '')
  const closeTime = new Date(branch?.closeTime ?? '')
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(openTime) + ':00',
    Close: branch?.closeTime && formatTime(closeTime) + ':00',
  }
  return await apiBranchService
    .put(`/${id}`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const deleteBranch = async (id: any) => {
  return await apiBranchService
    .delete(`/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

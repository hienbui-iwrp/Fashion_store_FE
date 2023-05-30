import { WarehouseProps, adminBff, formatResponse } from '@/utils'

export const getWarehouseBFF = () => {
  return adminBff
    .post('/warehouse-service/get-all-warehouse', '', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getWarehouseBFF err: ', err)
    })
}

export const getWarehouseManagerBFF = (id: any) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <WarehouseId>${id}</WarehouseId>
    </soap:Body>
    `
  return adminBff
    .post('/warehouse-service/get-manager', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getWarehouseManagerBFF err: ', err)
    })
}

export const getWarehouseStaffBFF = (id: any) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <WarehouseId>${id}</WarehouseId>
    </soap:Body>
    `
  return adminBff
    .post('/warehouse-service/get-staff', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getWarehouseStaffBFF err: ', err)
    })
}

export const addWarehouseBFF = (warehouse: WarehouseProps) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <WarehouseName>${warehouse.name}</WarehouseName>
        <Capacity>${warehouse.capacity}</Capacity>
        <Street>${warehouse.street}</Street>
        <Ward>${warehouse.ward}</Ward>
        <District>${warehouse.district}</District>
        <Province>${warehouse.province}</Province>
    </soap:Body>
    `
  return adminBff
    .post('/warehouse-service/add-warehouse', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('addWarehouseBFF err: ', err)
    })
}

export const updateWarehouseBFF = (id: any, warehouse: WarehouseProps) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <WarehouseCode>${id}</WarehouseCode>
        <WarehouseName>${warehouse.name ?? ''}</WarehouseName>
        <Capacity>${warehouse.capacity ?? ''}</Capacity>
        <Street>${warehouse.street ?? ''}</Street>
        <Ward>${warehouse.ward ?? ''}</Ward>
        <District>${warehouse.district ?? ''}</District>
        <Province>${warehouse.province ?? ''}</Province>
    </soap:Body>
    `
  console.log('payload: ', payload)
  return adminBff
    .post('/warehouse-service/update-warehouse', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('updateWarehouseBFF err: ', err)
    })
}

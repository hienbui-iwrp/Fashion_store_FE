import {
  AccountProps,
  BranchProps,
  RequestProps,
  StaffProps,
  AttendanceProps,
  CustomerInfoProps,
  EventProps,
  GoodsProps,
  WarehouseProps,
  ProductDetailDataProps,
  QuantityObj,
  GoodsInWarehouseProps,
  CartProps,
  ProductInCartProps,
  OrderProps,
  OrderDetailProps,
  OrderAdminData,
  GoodsOrderAdminData,
  OfflineOrderAdminData,
  OnlineOrderAdminData,
  StatisticData,
} from '../types'
import timeToDate from './timeToDate'

export const formatResponse = (data: any) => {
  const XMLParser = require('react-xml-parser')
  const xml = new XMLParser().parseFromString(data)
  return {
    StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
    Message: xml.getElementsByTagName('Message')[0].value,
    Data: xml.getElementsByTagName('Data'),
  }
}

export const formatUserDataXML = (data: any): CustomerInfoProps => {
  const _data: CustomerInfoProps = {
    username: data.getElementsByTagName('Username')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    email: data.getElementsByTagName('Email')[0].value,
    phone: data.getElementsByTagName('Phone')[0].value,
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    age: Number(data.getElementsByTagName('Age')[0].value),
    gender: data.getElementsByTagName('Gender')[0].value,
  }

  return _data
}

export const formatProductsDataXML = (data: any): ProductDetailDataProps[] => {
  let dataReturn: any = []
  data.forEach((itemData: any) => {
    dataReturn.push(formatProductDataXML(itemData))
  })
  return dataReturn
}

export const formatProductDataXML = (data: any): ProductDetailDataProps => {
  let listObjQuantity: QuantityObj[] = []
  const lenOfQuantity = data.getElementsByTagName('ListQuantity').length
  const listSize = data.getElementsByTagName('GoodsSize')
  const listColor = data.getElementsByTagName('GoodsColor')
  const listQuantity = data.getElementsByTagName('Quantity')
  listQuantity.map((quantity: any, index: number) => {
    listObjQuantity.push({
      quantity: Number(quantity.value),
      color: listColor[index].value,
      size: listSize[index].value,
    })
  })

  let images: string[] = []
  const imagesXML = data.getElementsByTagName('Images')
  if (imagesXML.length) {
    imagesXML.forEach((element: any) => {
      images.push(element.value)
    })
  }

  return {
    goodsId: data.getElementsByTagName('GoodsID')[0]?.value,
    name: data.getElementsByTagName('Name')[0]?.value,
    gender: data.getElementsByTagName('GoodsGender')[0]?.value,
    age: data.getElementsByTagName('GoodsAge')[0]?.value,
    images: images,
    listQuantity: listObjQuantity,
    discount: Number(data.getElementsByTagName('Discount')[0]?.value),
    type: data.getElementsByTagName('GoodsType')[0]?.value,
    unitPrice: Number(data.getElementsByTagName('UnitPrice')[0]?.value),
    price: Number(data.getElementsByTagName('Price')[0]?.value),
    description: data.getElementsByTagName('Description')[0]?.value,
  }
}

export const formatCartDataXML = (data: any): CartProps => {
  let listProduct: ProductInCartProps[] = []
  const listGoods = data.getElementsByTagName('Goods')
  listGoods.map((goods: any) => {
    const listQuantity = goods.getElementsByTagName('ListQuantity')
    listQuantity.map((quantityObj: any, index: number) => {
      listProduct.push({
        goodsId: goods.getElementsByTagName('GoodsId')[0].value,
        name: goods.getElementsByTagName('Name')[0]?.value,
        unitPrice: Number(goods.getElementsByTagName('UnitPrice')[0]?.value),
        price: Number(goods.getElementsByTagName('Price')[0]?.value),
        image: goods.getElementsByTagName('Images')[0]?.value,
        quantity: Number(
          quantityObj.getElementsByTagName('Quantity')[0]?.value
        ),
        maxQuantity: Number(
          quantityObj.getElementsByTagName('MaxQuantity')[0]?.value
        ),
        goodsSize: quantityObj.getElementsByTagName('GoodsSize')[0]?.value,
        goodsColor: quantityObj.getElementsByTagName('GoodsColor')[0]?.value,
        discount: Number(goods.getElementsByTagName('Discount')[0]?.value),
      })
    })
  })

  return {
    cartId: data.getElementsByTagName('CartId')[0].value,
    productsInCart: listProduct,
  }
}

export const formatOrdersDataXML = (data: any): OrderProps[] => {
  let listOrder: OrderProps[] = []
  data.map((order: any) => {
    const listGoods = order
      .getElementsByTagName('ListGoods')
      .map((goods: any) => {
        return {
          goodsId: goods.getElementsByTagName('GoodsId')[0].value,
          name: goods.getElementsByTagName('Name')[0]?.value,
          unitPrice: Number(goods.getElementsByTagName('UnitPrice')[0]?.value),
          price: Number(goods.getElementsByTagName('Price')[0]?.value),
          image: goods.getElementsByTagName('Image')[0]?.value,
          quantity: Number(goods.getElementsByTagName('Quantity')[0]?.value),
          goodsSize: goods.getElementsByTagName('Size')[0]?.value,
          goodsColor: goods.getElementsByTagName('Color')[0]?.value,
          discount: Number(goods.getElementsByTagName('Discount')[0]?.value),
        }
      })
    const statusShips = order
      .getElementsByTagName('StatusShip')
      .map((statusShip: any) => {
        return {
          status: statusShip.getElementsByTagName('State')[0].value,
          // statusNumber: statusShip.getElementsByTagName('StatusNumber')[0].value,
          time: new Date(statusShip.getElementsByTagName('Time')[0].value),
        }
      })
    listOrder.push({
      orderId: order.getElementsByTagName('OrderId')[0].value,
      orderCode: order.getElementsByTagName('OrderCode')[0].value,
      paymentMethod: order.getElementsByTagName('PaymentMethod')[0].value,
      totalPrice: Number(order.getElementsByTagName('TotalPrice')[0].value),
      totalGoods: Number(order.getElementsByTagName('TotalGoods')[0].value),
      totalDiscount: Number(
        order.getElementsByTagName('TotalDiscount')[0].value
      ),
      totalOrder: Number(order.getElementsByTagName('TotalOrder')[0].value),
      isCompleted:
        order.getElementsByTagName('IsCompleted')[0].value === 'true',
      shipFee: order.getElementsByTagName('ShipFee')[0].value,
      transactionDate: order.getElementsByTagName('TransactionDate')[0].value,
      listGoods,
      statusShips,
    })
  })

  return listOrder
}

export const formatOrderDataXML = (data: any): OrderDetailProps => {
  let listOrder: OrderDetailProps[] = []
  data.map((order: any) => {
    const listGoods = order
      .getElementsByTagName('ListGoods')
      .map((goods: any) => {
        return {
          goodsId: goods.getElementsByTagName('GoodsId')[0].value,
          name: goods.getElementsByTagName('Name')[0]?.value,
          unitPrice: Number(goods.getElementsByTagName('UnitPrice')[0]?.value),
          price: Number(goods.getElementsByTagName('Price')[0]?.value),
          image: goods.getElementsByTagName('Image')[0]?.value,
          quantity: Number(goods.getElementsByTagName('Quantity')[0]?.value),
          goodsSize: goods.getElementsByTagName('Size')[0]?.value,
          goodsColor: goods.getElementsByTagName('Color')[0]?.value,
          discount: Number(goods.getElementsByTagName('Discount')[0]?.value),
        }
      })
    const statusShips = order
      .getElementsByTagName('StatusShip')
      .map((statusShip: any) => {
        return {
          status: statusShip.getElementsByTagName('State')[0].value,
          // statusNumber: statusShip.getElementsByTagName('StatusNumber')[0].value,
          time: new Date(statusShip.getElementsByTagName('Time')[0].value),
        }
      })
    listOrder.push({
      orderId: order.getElementsByTagName('OrderId')[0].value,
      orderCode: order.getElementsByTagName('OrderCode')[0].value,
      paymentMethod: order.getElementsByTagName('PaymentMethod')[0].value,
      totalPrice: Number(order.getElementsByTagName('TotalPrice')[0].value),
      totalGoods: Number(order.getElementsByTagName('TotalGoods')[0].value),
      totalDiscount: Number(
        order.getElementsByTagName('TotalDiscount')[0].value
      ),
      totalOrder: Number(order.getElementsByTagName('TotalOrder')[0].value),
      isCompleted:
        order.getElementsByTagName('IsCompleted')[0].value === 'true',
      shipFee: Number(order.getElementsByTagName('ShipFee')[0].value),
      transactionDate: order.getElementsByTagName('TransactionDate')[0].value,
      listGoods,
      statusShips,
      expectDate: order.getElementsByTagName('ExpectDate')[0].value,
      status: Number(order.getElementsByTagName('Status')[0].value),
      nameReceiver: order.getElementsByTagName('NameReceiver')[0].value,
      phoneReceiver: order.getElementsByTagName('PhoneReceiver')[0].value,
      emailReceiver: order.getElementsByTagName('EmailReceiver')[0].value,
      address: {
        province: order.getElementsByTagName('Province')[0].value,
        district: order.getElementsByTagName('District')[0].value,
        ward: order.getElementsByTagName('Ward')[0].value,
        street: order.getElementsByTagName('Street')[0].value,
      },
    })
  })

  return listOrder[0]
}

export const formatBranchDataXML = (data: any): BranchProps => {
  const _data: BranchProps = {
    id: data.getElementsByTagName('BranchCode')[0].value,
    name: data.getElementsByTagName('BranchName')[0].value,
    street: data.getElementsByTagName('BranchStreet')[0].value,
    ward: data.getElementsByTagName('BranchWard')[0].value,
    district: data.getElementsByTagName('BranchDistrict')[0].value,
    province: data.getElementsByTagName('BranchProvince')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
    openTime: timeToDate(data.getElementsByTagName('OpenTime')[0].value),
    closeTime: timeToDate(data.getElementsByTagName('CloseTime')[0].value),
    manager: data.getElementsByTagName('Manager')[0].value,
    image: data.getElementsByTagName('Image')[0]?.value,
  }

  return _data
}

export const formatBranchDataXML2 = (data: any): BranchProps => {
  const _data: BranchProps = {
    id: data.getElementsByTagName('BranchId')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
    openTime: timeToDate(data.getElementsByTagName('Open')[0].value),
    closeTime: timeToDate(data.getElementsByTagName('Close')[0].value),
    manager: data.getElementsByTagName('Manager')[0].value,
    image: data.getElementsByTagName('Image')[0]?.value,
  }

  return _data
}

export const formatAccountDataXML = (data: any): AccountProps => {
  const _data: any = {
    id: data.getElementsByTagName('Id')[0].value,
    username: data.getElementsByTagName('Username')[0].value,
    role: data.getElementsByTagName('Role')[0].value,
    phoneNumber: data.getElementsByTagName('PhoneNumber')[0].value,
    startDate: new Date(data.getElementsByTagName('StartDate')[0].value),
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    isActivated: data.getElementsByTagName('isActivated')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
  }
  return _data
}

export const formatStaffDataXML = (data: any): StaffProps => {
  const _data = data.getElementsByTagName('Data')[0]
  return {
    id: _data.getElementsByTagName('StaffId')[0]?.value,
    name: _data.getElementsByTagName('StaffName')[0]?.value,
    role: _data.getElementsByTagName('Role')[0]?.value,
    branchId: _data.getElementsByTagName('BranchId')[0]?.value,
    citizenId: _data.getElementsByTagName('CitizenId')[0]?.value,
    phone: _data.getElementsByTagName('PhoneNumber')[0]?.value,
    street: _data.getElementsByTagName('Street')[0]?.value,
    ward: _data.getElementsByTagName('Ward')[0]?.value,
    district: _data.getElementsByTagName('District')[0]?.value,
    province: _data.getElementsByTagName('Province')[0]?.value,
    hometown: _data.getElementsByTagName('Hometown')[0]?.value,
    salary: _data.getElementsByTagName('Salary')[0]?.value,
    status: _data.getElementsByTagName('Status')[0]?.value,
    email: _data.getElementsByTagName('Email')[0]?.value,
    gender: _data.getElementsByTagName('Gender')[0]?.value,
    birthdate: new Date(_data.getElementsByTagName('Birthdate')[0]?.value),
    startDate: new Date(_data.getElementsByTagName('StartDate')[0]?.value),
  }
}

export const formatAttendanceDataXML = (data: any): AttendanceProps => {
  const _data = data.getElementsByTagName('Data')[0]

  return {
    date: new Date(_data.getElementsByTagName('AttendanceDate')[0]?.value),
    checkIn: new Date(_data.getElementsByTagName('CheckinTime')[0]?.value),
    checkOut: _data
      .getElementsByTagName('CheckoutTime')[0]
      ?.getElementsByTagName('Valid')[0].value
      ? new Date(
          _data
            .getElementsByTagName('CheckoutTime')[0]
            ?.getElementsByTagName('Time')[0].value
        )
      : undefined,
  }
}

export const formatRequestDataXML = (data: any): RequestProps => {
  return {
    id: data.getElementsByTagName('Id')[0]?.value,
    staffId: data.getElementsByTagName('StaffId')[0]?.value,
    status: data.getElementsByTagName('Status')[0]?.value,
    type: data.getElementsByTagName('RequestType')[0]?.value,
    date: new Date(data.getElementsByTagName('RequestDate')[0]?.value),
  }
}

export const formatEventDataXML = (data: any): EventProps => {
  return {
    id: data.getElementsByTagName('Id')[0]?.value,
    name: data.getElementsByTagName('Name')[0]?.value,
    discount: parseFloat(data.getElementsByTagName('Discount')[0]?.value) * 100,
    startTime: data.getElementsByTagName('StartTime')[0]?.value,
    endTime: data.getElementsByTagName('EndTime')[0]?.value,
    image: data.getElementsByTagName('Image')[0]?.value,
    goods: data.getElementsByTagName('Goods').map((item: any) => item.value),
  }
}

export const formatGoodsDataXML = (data: any): GoodsProps => {
  const classify = data.getElementsByTagName('Classify').map((item: any) => {
    return {
      size: item.getElementsByTagName('Size')[0]?.value,
      color: item.getElementsByTagName('Color')[0]?.value,
    }
  })

  return {
    id: data.getElementsByTagName('GoodsId')[0]?.value,
    name: data.getElementsByTagName('GoodsName')[0]?.value,
    classify: classify,
    type: data.getElementsByTagName('GoodsType')[0]?.value,
    gender: data.getElementsByTagName('GoodsGender')[0]?.value,
    age: data.getElementsByTagName('GoodsAge')[0]?.value,
    supplier: data.getElementsByTagName('Manufacturer')[0]?.value,
    isSale: data.getElementsByTagName('IsForSale')[0]?.value == 1,
    price: data.getElementsByTagName('UnitPrice')[0]?.value,
    cost: data.getElementsByTagName('UnitCost')[0]?.value,
    description: data.getElementsByTagName('Description')[0]?.value,
    image: data.getElementsByTagName('Image').map((item: any) => item.value),
  }
}

export const formatGoodsInWarehouseDataXML = (
  data: any
): GoodsInWarehouseProps => {
  const updateDate = new Date(
    data.getElementsByTagName('UpdatedDate')[0]?.value
  )
  return {
    id: data.getElementsByTagName('GoodsCode')[0]?.value,
    size: data.getElementsByTagName('GoodsSize')[0]?.value,
    color: data.getElementsByTagName('GoodsColor')[0]?.value,
    quantity: data.getElementsByTagName('Quantity')[0]?.value,
    createdDate: new Date(data.getElementsByTagName('CreatedDate')[0]?.value),
    updateDate: updateDate.getTime() > 0 ? updateDate : undefined,
    warehouseId: data.getElementsByTagName('WhCode')[0]?.value,
  }
}

export const formatWarehouseDataXML = (data: any): WarehouseProps => {
  return {
    id: data.getElementsByTagName('WarehouseCode')[0]?.value,
    name: data.getElementsByTagName('WarehouseName')[0]?.value,
    street: data.getElementsByTagName('Street')[0]?.value,
    ward: data.getElementsByTagName('Ward')[0]?.value,
    district: data.getElementsByTagName('District')[0]?.value,
    province: data.getElementsByTagName('Province')[0]?.value,
    capacity: data.getElementsByTagName('Capacity')[0]?.value,
    createdDate: data.getElementsByTagName('CreatedAt')[0]?.value,
  }
}

export const formatOrderAdminDataXML = (data: any): OrderAdminData => {
  return {
    id: data.getElementsByTagName('OrderId')[0]?.value,
    publicId: data.getElementsByTagName('OrderCode')[0]?.value,
    goods: data
      .getElementsByTagName('ListGoods')
      .map((item: any) => formatListGoodsXML(item)),
    price: data.getElementsByTagName('TotalPrice')[0]?.value,
    totalDiscount: data.getElementsByTagName('TotalDiscount')[0]?.value,
    totalGoods: data.getElementsByTagName('TotalGoods')[0]?.value,
    totalPrice: data.getElementsByTagName('TotalOrder')[0]?.value,
    transactionDate: new Date(
      data.getElementsByTagName('TransactionDate')[0]?.value
    ),
    onlineData:
      data.getElementsByTagName('OnlineOrderData')[0] &&
      formatOnlineOrderDataXML(data.getElementsByTagName('OnlineOrderData')[0]),
    offlineData:
      data.getElementsByTagName('OfflineOrderData')[0] &&
      formatOfflineOrderDataXML(
        data.getElementsByTagName('OfflineOrderData')[0]
      ),
    isOnline: data.getElementsByTagName('IsOnline')[0]?.value == 'true',
  }
}

const formatListGoodsXML = (data: any): GoodsOrderAdminData => {
  return {
    goodsId: data.getElementsByTagName('GoodsId')[0].value,
    image: data.getElementsByTagName('Image')[0]?.value,
    name: data.getElementsByTagName('Name')[0]?.value,
    unitPrice: Number(data.getElementsByTagName('UnitPrice')[0]?.value),
    price: Number(data.getElementsByTagName('Price')[0]?.value),
    tax: Number(data.getElementsByTagName('Tax')[0]?.value),
    quantity: Number(data.getElementsByTagName('Quantity')[0]?.value),
    goodsSize: data.getElementsByTagName('Size')[0]?.value,
    goodsColor: data.getElementsByTagName('Color')[0]?.value,
    discount: Number(data.getElementsByTagName('Discount')[0]?.value),
  }
}

const formatOnlineOrderDataXML = (data: any): OnlineOrderAdminData => {
  return {
    paymentMethod: data.getElementsByTagName('PaymentMethod')[0]?.value,
    customerId: data.getElementsByTagName('CustomerId')[0]?.value,
    isCompleted: data.getElementsByTagName('IsCompleted')[0]?.value,
    shipFee: data.getElementsByTagName('ShipFee')[0]?.value,
    expectDate: new Date(data.getElementsByTagName('ExpectDate')[0]?.value),
    status: data.getElementsByTagName('Status')[0]?.value,
    nameReceiver: data.getElementsByTagName('NameReceiver')[0]?.value,
    phoneReceiver: data.getElementsByTagName('PhoneReceiver')[0]?.value,
    emailReceiver: data.getElementsByTagName('EmailReceiver')[0]?.value,
    address: {
      province: data.getElementsByTagName('Province')[0].value,
      district: data.getElementsByTagName('District')[0].value,
      ward: data.getElementsByTagName('Ward')[0].value,
      street: data.getElementsByTagName('Street')[0].value,
    },
  }
}

const formatOfflineOrderDataXML = (data: any): OfflineOrderAdminData => {
  return {
    staffId: data.getElementsByTagName('StaffId')[0]?.value,
    branchhId: data.getElementsByTagName('BranchId')[0]?.value,
  }
}

export const formatStatisticDataXML = (data: any[]): StatisticData[] => {
  return data.map((item: any) => {
    return {
      revenue: Number(item.getElementsByTagName('Revenue')[0]?.value),
      profit: Number(item.getElementsByTagName('Profit')[0]?.value),
      date: new Date(item.getElementsByTagName('Date')[0]?.value),
    }
  })
}

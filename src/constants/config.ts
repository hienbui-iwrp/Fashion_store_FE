export const configVNPay = {
  "vnp_TmnCode": "KMVBS5LA",
  "vnp_HashSecret": "OPDONOUODFQKOGNMYDXQAXKIAJMWZHOS",
  "vnp_Url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  "vnp_Api": "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  "vnp_ReturnUrl": `${process.env.NEXT_PUBLIC_BASE_URL}payment/confirm-vnpay`
}
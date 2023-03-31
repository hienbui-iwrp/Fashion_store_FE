import { createSlice } from "@reduxjs/toolkit";
// import { ProductsDataProps } from "@/utils";

const initialState: any = {
  totalPrice: 0,
  listProductPayment: []
}

export const productsPaymentSlice = createSlice({
  name: 'productsPayment',
  initialState,
  reducers: {
    setProductsPayment: (state, action) => {
      return { ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  }
});
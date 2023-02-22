import { createSlice } from "@reduxjs/toolkit";
import { ProductsDataProps } from "@/utils";

const initialState: ProductsDataProps = {
  totalProducts: 0,
  listProduct: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setListProduct: (state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  }
});
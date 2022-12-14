import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    img: "",
    isImgLoading: false,
    isImgError: false,
    isFetching: false,
    error: false,
  },
  reducers: {
    // UPDATE IMG
    updateImgStart: (state) => {
      state.isImgLoading = true;
      state.isImgError = false;
    },
    updateImg: (state, action) => {
      state.img = action.payload;
    },
    updateImgSuccess: (state) => {
      state.isImgLoading = false;
    },
    updateImgFailure: (state) => {
      state.isImgLoading = false;
      state.isImgError = true;
    },

    // REMOVE IMG
    removeImg: (state) => {
      state.img = "";
    },

    // GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // ADD NEW Product
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateImg,
  updateImgStart,
  updateImgFailure,
  updateImgSuccess,
  removeImg,
} = productSlice.actions;
export default productSlice.reducer;

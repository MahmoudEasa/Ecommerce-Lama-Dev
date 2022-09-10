import { publicRequest, userRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure, logout } from "./userRedux";
import {
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
  removeImg,
} from "./productRedux";

// LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// LOGOUT
export const logoutUser = (dispatch) => {
  dispatch(logout());
};

// UPDATE IMG PRODUCT
export const updateImgProduct = (dispatch, img) => {
  dispatch(updateImg(img));
};

// REMOVE IMG PRODUCT
export const removeImgProduct = (dispatch) => {
  dispatch(removeImg());
};

// GET ALL
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// DELETE PRODUCT
export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// UPDATE PRODUCT
export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// ADD NEW PRODUCT
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

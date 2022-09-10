import { publicRequest, userRequest } from "../../requestMethods";
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
} from "../productRedux";

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
export const updateProduct = async (dispatch, id, product, navigate) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
    navigate("/products");
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// ADD NEW PRODUCT
export const addProduct = async (dispatch, product, navigate) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    navigate("/products");
    removeImgProduct(dispatch);
  } catch (err) {
    dispatch(addProductFailure());
  }
};

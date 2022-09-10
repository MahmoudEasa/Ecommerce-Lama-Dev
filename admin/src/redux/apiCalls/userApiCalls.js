import { userRequest } from "../../requestMethods";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserImg,
  removeUserImg,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "../userRedux";

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

// UPDATE IMG USER
export const updateImgUser = (dispatch, img) => {
  dispatch(updateUserImg(img));
};

// REMOVE IMG USER
export const removeImgUser = (dispatch) => {
  dispatch(removeUserImg());
};

// GET ALL
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// DELETE USER
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// UPDATE USER
export const updateUser = async (dispatch, id, user, navigate) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    navigate("/users");
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

// ADD NEW USER
export const addUser = async (dispatch, user, navigate) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
    navigate("/users");
  } catch (err) {
    dispatch(addUserFailure());
  }
};

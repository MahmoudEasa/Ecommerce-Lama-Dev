import "./user.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { firebaseImg } from "../../firebase";
import { updateImgUser, updateUser } from "../../redux/apiCalls/userApiCalls";
import Loading from "../../components/loading/Loading";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useLocation().pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const [status, setStatus] = useState(user.status);

  const { img, isImgLoading, isImgError, isFetching, error } = useSelector(
    (state) => state.user
  );

  const handleUpdate = (data) => {
    const user = { ...data, img, status };
    updateUser(dispatch, userId, user, navigate);
  };

  const handleChangeFile = (e) => {
    firebaseImg(e.target.files[0], dispatch, "user");
  };

  useEffect(() => {
    updateImgUser(dispatch, user.img);
  }, [dispatch, user.img]);

  error && toast.error("Something is wrong");

  return (
    <div className="user">
      <ToastContainer />
      {isFetching && <Loading />}
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.title}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.createdAt.split("").slice(0, 10).join("")}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="userUpdateForm"
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="userUpdateInput"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    value: user.username,
                  })}
                />
                <label>{errors.username && errors.username.message}</label>
              </div>
              <div className="userUpdateItem">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  className="userUpdateInput"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title is required",
                    },
                    value: user.title,
                  })}
                />
                <label>{errors.title && errors.title.message}</label>
              </div>
              <div className="userUpdateItem">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="userUpdateInput"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    value: user.email,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is not valid!",
                    },
                  })}
                />
                <label>{errors.email && errors.email.message}</label>
              </div>
              <div className="userUpdateItem">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="userUpdateInput"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    value: user.password,
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                <label>{errors.password && errors.password.message}</label>
              </div>
              <div className="userUpdateItem">
                <label htmlFor="phone">Phone</label>
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  className="userUpdateInput"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone is required",
                    },
                    value: user.phone,
                    pattern: {
                      value: /^[0-9+-]+$/,
                      message: "This is not a valid mobile phone!",
                    },
                    minLength: {
                      value: 11,
                      message: "This number is too short!",
                    },
                    maxLength: {
                      value: 11,
                      message: "This number is too long!",
                    },
                  })}
                />
                <label>{errors.phone && errors.phone.message}</label>
              </div>
              <div className="userUpdateItem">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  id="address"
                  type="text"
                  className="userUpdateInput"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                    value: user.address,
                  })}
                />
                <label>{errors.address && errors.address.message}</label>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {isImgLoading ? (
                  <div className="loading" style={{ padding: "100px 0" }}>
                    Loading...
                  </div>
                ) : isImgError ? (
                  <div className="error" style={{ padding: "100px 0" }}>
                    Something is wrong
                  </div>
                ) : (
                  <label htmlFor="file">
                    <img className="userUpdateImg" src={img} alt="" />
                  </label>
                )}
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  onChange={(e) => handleChangeFile(e)}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <div className="status">
                <label>Status</label>
                <select
                  className={status}
                  defaultValue={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  id="status"
                >
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                  <option value="declined">declined</option>
                </select>
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;

import "./newUser.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { addUser } from "../../redux/apiCalls/userApiCalls";
import Loading from "../../components/loading/Loading";
import { ToastContainer, toast } from "react-toastify";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const { isFetching, error } = useSelector((state) => state.user);

  const handleUpdate = (data) => {
    const user = { ...data, status };
    addUser(dispatch, user, navigate);
  };

  error && toast.error("Something is wrong");

  return (
    <div className="newUser">
      <ToastContainer />
      <h1 className="newUserTitle">New User</h1>
      <form onSubmit={handleSubmit(handleUpdate)} className="newUserForm">
        <div className="newUserItem">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <label>{errors.username && errors.username.message}</label>
        </div>
        <div className="newUserItem">
          <label htmlFor="job">Job</label>
          <input
            type="text"
            placeholder="job"
            name="job"
            id="job"
            {...register("job", {
              required: {
                value: true,
                message: "Job is required",
              },
            })}
          />
          <label>{errors.job && errors.job.message}</label>
        </div>
        <div className="newUserItem">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid!",
              },
            })}
          />
          <label>{errors.email && errors.email.message}</label>
        </div>
        <div className="newUserItem">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          <label>{errors.password && errors.password.message}</label>
        </div>
        <div className="newUserItem">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="phone"
            name="phone"
            id="phone"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone is required",
              },
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
        <div className="newUserItem">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="address"
            name="address"
            id="address"
            {...register("address", {
              required: {
                value: true,
                message: "Address is required",
              },
            })}
          />
          <label>{errors.address && errors.address.message}</label>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              {...register("gender", {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              })}
            />
            <label htmlFor="male">Male</label>
            <input
              {...register("gender", {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              })}
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            <label htmlFor="female">Female</label>
          </div>
          <label>{errors.gender && errors.gender.message}</label>
        </div>
        <div className="newUserItem">
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
          <label>{errors.status && errors.status.message}</label>
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
      {isFetching && <Loading />}
    </div>
  );
};

export default NewUser;

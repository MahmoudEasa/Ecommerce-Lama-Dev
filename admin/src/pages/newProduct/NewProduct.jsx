import "./newProduct.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { firebaseImg } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/loading/Loading";
import {
  addProduct,
  removeImgProduct,
} from "../../redux/apiCalls/productApiCalls";

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { img, isImgLoading, isImgError, isFetching, error } = useSelector(
    (state) => state.product
  );

  const [cat, setCat] = useState([]);

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleCreate = (data) => {
    const products = {
      ...data,
      img:
        img ||
        "https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png",
      categories: cat,
    };
    addProduct(dispatch, products, navigate);
  };

  useEffect(() => {
    removeImgProduct(dispatch);
  }, [dispatch]);

  error && toast.error("Something is wrong");
  return (
    <div className="newProduct">
      <ToastContainer />
      {isFetching && <Loading />}
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleSubmit(handleCreate)} className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => {
              firebaseImg(e.target.files[0], dispatch, "product");
            }}
          />
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
              <img
                style={{ width: "100%" }}
                src={
                  img ||
                  "https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png"
                }
                alt=""
              />
            </label>
          )}
        </div>
        <div className="addProductItem">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="title..."
            name="title"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          <label>{errors.title && errors.title.message}</label>
        </div>
        <div className="addProductItem">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="100"
            name="price"
            {...register("price", {
              required: {
                value: true,
                message: "Price is required",
              },
            })}
          />
          <label>{errors.price && errors.price.message}</label>
        </div>
        <div className="addProductItem">
          <label htmlFor="categories">Categories</label>
          <input
            id="categories"
            type="text"
            name="categories"
            placeholder="jeans,skirts"
            onChange={handleCat}
            {...register("categories", {
              required: {
                value: true,
                message: "Categories is required",
              },
            })}
          />
          <label>{errors.categories && errors.categories.message}</label>
        </div>
        <div className="addProductItem">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            type="text"
            placeholder="description..."
            name="desc"
            {...register("desc", {
              required: {
                value: true,
                message: "Description is required",
              },
            })}
          />
          <label>{errors.desc && errors.desc.message}</label>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select {...register("inStock")} defaultValue="true" name="inStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;

import "./product.css";
import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Publish } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Chart from "../../components/chart/Chart";
import { userRequest } from "../../requestMethods";
import { firebaseImg } from "../../firebase";
import Loading from "../../components/loading/Loading";
import {
  updateImgProduct,
  updateProduct,
} from "../../redux/apiCalls/productApiCalls";

const Product = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  const productId = location;

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const { img, isImgLoading, isImgError, isFetching, error } = useSelector(
    (state) => state.product
  );

  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    userRequest
      .get("/orders/income?pid=" + productId)
      .then((res) => {
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
          return 0;
        });
      })
      .catch((err) => console.log(err));
  }, [MONTHS, productId]);

  const handleUpdate = (data) => {
    const product = { ...data, img };
    updateProduct(dispatch, productId, product, navigate);
  };

  const handleChangeFile = (e) => {
    firebaseImg(e.target.files[0], dispatch, "product");
  };

  useEffect(() => {
    updateImgProduct(dispatch, product.img);
  }, [dispatch, product.img]);

  error && toast.error("Something is wrong");
  return (
    <div className="product">
      <ToastContainer />
      {isFetching && <Loading />}
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "yes" : "no"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={handleSubmit(handleUpdate)} className="productForm">
          <div className="productFormLeft">
            <div className="inputContainer">
              <label htmlFor="title">Product Name</label>
              <input
                name="title"
                id="title"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                  value: product.title,
                })}
              />
              <label>{errors.title && errors.title.message}</label>
            </div>
            <div className="inputContainer">
              <label htmlFor="desc">Product Description</label>
              <textarea
                name="desc"
                id="desc"
                type="text"
                {...register("desc", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                  value: product.desc,
                })}
              />
              <label>{errors.desc && errors.desc.message}</label>
            </div>
            <div className="inputContainer">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                id="price"
                type="text"
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                  value: product.price,
                  pattern: {
                    value: /^[0-9+-]+$/,
                    message: "This is not a valid number!",
                  },
                })}
              />
              <label>{errors.price && errors.price.message}</label>
            </div>
            <div className="inputContainer">
              <label>In Stock</label>
              <select
                name="inStock"
                id="inStock"
                {...register("inStock", { value: product.inStock })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <label>{errors.inStock && errors.inStock.message}</label>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
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
                  <img className="productUploadImg" src={img} alt="" />
                </label>
              )}
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                onChange={(e) => handleChangeFile(e)}
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            <button type="submit" className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;

import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Publish } from "@material-ui/icons";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { userRequest } from "../../requestMethods";
import { firebaseImg } from "../../firebase";
import {
  removeImgProduct,
  updateImgProduct,
  updateProduct,
} from "../../redux/apiCalls";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  const productId = location;

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const img = useSelector((state) => state.product.img);

  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock,
  });

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

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = { ...inputs, img };
    updateProduct(dispatch, productId, data).then(() => navigate("/products"));
    removeImgProduct(dispatch);
  };

  const handleChangeFile = (e) => {
    firebaseImg(e.target.files[0], dispatch);
  };

  useEffect(() => {
    updateImgProduct(dispatch, product.img);
  }, [dispatch, product.img]);

  return (
    <div className="product">
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
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder={product.title}
            />
            <label>Product Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              type="text"
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              name="price"
              onChange={handleChange}
              type="text"
              placeholder={product.price}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              onChange={handleChange}
              defaultValue={product.inStock}
              id="idStock"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={img} alt="" className="productUploadImg" />
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
            <button onClick={handleUpdate} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;

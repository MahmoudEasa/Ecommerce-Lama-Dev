import "./newProduct.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firebaseImg } from "../../firebase";
import { addProduct, removeImgProduct } from "../../redux/apiCalls";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = useSelector((state) => state.product.img);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: 0,
    inStock: "true",
  });

  const [cat, setCat] = useState([]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const products = { ...inputs, img, categories: cat };
    addProduct(dispatch, products).then(() => navigate("/products"));
    removeImgProduct(dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              firebaseImg(e.target.files[0], dispatch);
            }}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="title..."
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="100"
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description..."
            onChange={handleChange}
            name="desc"
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select
            defaultValue={inputs.inStock}
            onChange={handleChange}
            name="inStock"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleCreate} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
      )
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [cat]);

  useEffect(() => {
    cat &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product key={item.id} item={item} />)
        : products.map((item) => <Product key={item.id} item={item} />)}
    </Container>
  );
};

export default Products;

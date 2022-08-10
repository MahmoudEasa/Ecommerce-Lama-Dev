import styled from "styled-components";
import CategoriesItem from "./CategoriesItem";
import { categories } from "../data";
import { mobile } from "./../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding: "0px" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoriesItem key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Categories;

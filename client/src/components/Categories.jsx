import styled from "styled-components";
import CategoriesItem from "./CategoriesItem";
import { categories } from "../data";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
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

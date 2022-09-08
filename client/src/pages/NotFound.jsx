import { styled } from "styled-components";

const Container = styled.div`
  flex: 4;
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;
const NotFound = () => {
  return (
    <Container>
      <h1>NotFound</h1>
    </Container>
  );
};

export default NotFound;

import { useState } from "react";
import styled from "styled-components";

import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRight,
} from "@material-ui/icons";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;

  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(0vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImgContainer = styled.div`
  flex: 1;
  width: 100%;
  padding-left: 50px;
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (dir) => {
    if (dir === "left") {
      if (slideIndex === 0) {
        setSlideIndex(-200);
      } else {
        setSlideIndex(slideIndex + 100);
      }
    } else {
      if (slideIndex === -200) {
        setSlideIndex(0);
      } else {
        setSlideIndex(slideIndex - 100);
      }
    }
    console.log(slideIndex);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftOutlined />
      </Arrow>
      <Wrapper>
        <Slide bg="#f5fafd">
          <ImgContainer>
            <Image src="https://i.ibb.co/DG69bQ4/2.png" />
          </ImgContainer>
          <InfoContainer>
            <Title>SUMMER SALE</Title>
            <Desc>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="#fcf1ed">
          <ImgContainer>
            <Image src="https://i.ibb.co/DG69bQ4/2.png" />
          </ImgContainer>
          <InfoContainer>
            <Title>AUTUMN COLLECTION</Title>
            <Desc>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="#fbf0f4">
          <ImgContainer>
            <Image src="https://i.ibb.co/DG69bQ4/2.png" />
          </ImgContainer>
          <InfoContainer>
            <Title>LOUNGEWEAR LOVE</Title>
            <Desc>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;

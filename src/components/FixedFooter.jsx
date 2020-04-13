import React from "react";
import styled from "styled-components";
import WindowsIcon from "../assets/icon-windows-start.png";
import DynamicTimeText from "../components/DynamicTimeText";
import ButtonBorder from "./ButtonBorder";

const StyledFixedFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  left: 0;
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: lightgrey;
  padding: 2px;
  > img,
  div {
    margin: 2px 4px;
  }
  @media (min-width: 500px) {
    > img,
    div {
      // Scroll bar cuts off on larger screens
      margin-right: 25px;
    }
  }
`;

const FixedFooter = (props) => {
  return (
    <StyledFixedFooter {...props}>
      <img src={WindowsIcon} height={24} />
      <ButtonBorder>
        <DynamicTimeText />
      </ButtonBorder>
    </StyledFixedFooter>
  );
};

export default FixedFooter;

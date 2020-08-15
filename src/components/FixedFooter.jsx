import React from "react";
import styled from "styled-components";
import DynamicTimeText from "../components/DynamicTimeText";
import ButtonBorder from "./ButtonBorder";
import Theme from "../Theme";

const StyledFixedFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: left;
  background-color: white;
  padding: 2px;
  > img,
  div {
    margin: 2px 4px;
  }
`;

const FixedFooter = (props) => {
  return (
    <StyledFixedFooter {...props}>
      <ButtonBorder>
        <DynamicTimeText />
      </ButtonBorder>
      <span role="img">🎹</span>
    </StyledFixedFooter>
  );
};

export default FixedFooter;

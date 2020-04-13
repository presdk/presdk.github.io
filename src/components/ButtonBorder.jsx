import React from "react";
import styled from "styled-components";

const StyledButtonBorder = styled.div`
  border-style: solid;
  border-width: thin;
  box-shadow: -0.5px -1px 0px 1px grey;
  padding: 2px;
`;

const ButtonBorder = ({ children }) => {
  return <StyledButtonBorder>{children}</StyledButtonBorder>;
};

export default ButtonBorder;

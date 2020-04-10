import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  max-width: 500px;
`;

const HalfWidthPage = ({ children }) => {
  return <Container>{children}</Container>;
};

export default HalfWidthPage;
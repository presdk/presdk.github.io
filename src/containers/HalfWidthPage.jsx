import React from "react";
import styled from "styled-components";

const Page = styled.div`
  display: inline-block;
  max-width: 500px;
`;

const HalfWidthPage = ({ children }) => {
  return <Page>{children}</Page>;
};

export default HalfWidthPage;
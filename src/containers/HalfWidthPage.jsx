import React from "react";
import styled from "styled-components";

const Page = styled.div`
  display: inline-block;
  width: 100vw;
  max-width: 700px;
`;

const HalfWidthPage = (props) => {
  return <Page {...props}>{props.children}</Page>;
};

export default HalfWidthPage;

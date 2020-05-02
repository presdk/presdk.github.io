import React from "react";
import styled from "styled-components";

const StyledFade = styled.div`
  animation: fadeIn ease ${props => props.delay | 1}s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Fade = (props) => {
  return (
    <StyledFade {...props}>
      {props.children}
    </StyledFade>
  );
};

export default Fade;

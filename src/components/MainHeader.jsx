import React from "react";
import styled from "styled-components";

const StyledMainHeader = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .lg {
    font-size: 2em;
  }

  .sm {
    font-size: 1em;
  }
`;

const MainHeader = (props) => {
  return (
    <StyledMainHeader {...props}>
      <div role="img" className="lg">🙊</div>
      <div className="sm">DAOON</div>
    </StyledMainHeader>
  );
};

export default MainHeader;

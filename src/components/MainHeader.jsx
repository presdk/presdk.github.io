import React from "react";
import styled from "styled-components";
import AvatarImage from "../assets/avatar.jpg";

const StyledMainHeader = styled.div`
  z-index: 10;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CircleImage = styled.img`
  clip-path: circle(50px at center);
  width: 100px;
  height: 100px;
`;

const MainHeader = (props) => {
  return (
    <StyledMainHeader {...props}>
      <div>
        <CircleImage src={AvatarImage} />
      </div>
      <div>DAOON</div>
    </StyledMainHeader>
  );
};

export default MainHeader;

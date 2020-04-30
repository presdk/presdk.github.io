import React from "react";
import styled from "styled-components";
import AvatarImage from "../assets/avatar.jpg";

const CircleImage = styled.img`
  clip-path: circle(50px at center);
  width: 100px;
  height: 100px;
`;

const MainHeader = (props) => {
  return (
    <div {...props} className="text-center" style={{backgroundColor:"white"}}>
        <CircleImage src={AvatarImage} />
      <div>DAOON</div>
    </div>
  );
};

export default MainHeader;

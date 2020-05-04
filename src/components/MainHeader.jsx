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
    <div {...props} className="text-center pt-3" style={{backgroundColor:"white"}}>
        <CircleImage src={AvatarImage} />
      <p className="mt-3 pb-3" style={{fontSize: "1.25rem"}}>DAOON</p>
    </div>
  );
};

export default MainHeader;

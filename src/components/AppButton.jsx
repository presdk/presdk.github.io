import React from "react";
import styled from "styled-components";

const IconText = styled.p`
margin-block-start: 0;
margin-block-end: 0;
`;

const AppButton = ({ text, iconSrc }) => {
  return (
    <div>
      <img src={iconSrc} width={24} height={24} />
      <IconText>{text}</IconText>
    </div>
  );
};

export default AppButton;

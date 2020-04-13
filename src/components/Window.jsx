import React from "react";
import styled from "styled-components";
import FolderIcon from "../assets/icon-folder.png";

const StyledWindow = styled.div`
  background-color: lightgrey;
  border-style: solid;
  border-width: thin;
  border-color: white;
  box-shadow: 1px 1px 1px 1px grey;
`;

const TopBar = styled.div`
  display: flex;
  background-color: #08aeea;
  padding: 4px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const Window = (props) => {
  return (
    <StyledWindow {...props}>
      <TopBar>
        <img src={FolderIcon} />
      </TopBar>
      {props.children}
    </StyledWindow>
  );
};

export default Window;

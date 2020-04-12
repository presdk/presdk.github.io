import React from "react";
import styled from "styled-components";
import AppButton from "../components/AppButton";
import FolderIcon from "../assets/icon-folder.png";
import MsDosIcon from "../assets/icon-msdos.png";
import MsnIcon from "../assets/icon-msn.png";
import NotepadIcon from "../assets/icon-notepad.png";
import WorldIcon from "../assets/icon-world.png";

const Row = styled.div`
  display: flex;
  justify-content: center;
  > div {
      margin-left: 1em;
      margin-right: 1em;
      margin-bottom: 2em;
  }
`;

const AppButtonSection = (props) => {
  return (
    <section>
      <Row>
        <AppButton text="Blog" iconSrc={NotepadIcon} />
        <AppButton text="Outside" iconSrc={WorldIcon}/>
      </Row>
      <Row>
        <AppButton text="Gallery" iconSrc={FolderIcon}/>
        <AppButton text="Projects" iconSrc={MsDosIcon}/>
        <AppButton text="Social" iconSrc={MsnIcon}/>
      </Row>
    </section>
  );
};

export default AppButtonSection;

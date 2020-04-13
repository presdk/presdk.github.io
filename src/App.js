import React, { useState } from "react";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import FixedFooter from "./components/FixedFooter";
import Theme from "./Theme";
import MainHeader from "./components/MainHeader";
import HalfWidthPage from "./containers/HalfWidthPage";

const Container = styled.div`
  text-align: center;
  font-family: "Viga", sans-serif;
  font-size: 1em;
  color: ${Theme.Primary};
`;

const App = () => {

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const onLightBoxStateChanged = (isOpen) => {
    setIsLightBoxOpen(isOpen);
  }

  return (
    <Container>
      <MainHeader style={{ height: "10em" }} hidden={isLightBoxOpen}/>
      <HalfWidthPage style={{ paddingTop: "9em", paddingBottom: "3em" }}>
        <PicturePostPage onLightBoxStateChanged={onLightBoxStateChanged} />
      </HalfWidthPage>
      <FixedFooter style={{ height: "2em" }} />
    </Container>
  );
};

export default App;

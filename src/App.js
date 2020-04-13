import React from "react";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import FixedFooter from "./components/FixedFooter";
import Theme from "./Theme";
import MainHeader from "./components/MainHeader";

const Container = styled.div`
  text-align: center;
  font-family: "Viga", sans-serif;
  font-size: 1em;
  color: ${Theme.Primary};
`;

const App = () => {
  return (
    <Container>
      <MainHeader style={{ height: "10em" }} />
      <PicturePostPage style={{ paddingTop: "9em", paddingBottom: "3em"}} />
      <FixedFooter style={{ height: "2em" }} />
    </Container>
  );
};

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import HalfWidthPage from "./containers/HalfWidthPage";
import Window from "./components/Window";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const App = () => {
  return (
    <Container>
      <HalfWidthPage>
        <PicturePostPage />
      </HalfWidthPage>
    </Container>
  );
};

export default App;

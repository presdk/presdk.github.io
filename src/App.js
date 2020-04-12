import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import HalfWidthPage from "./containers/HalfWidthPage";
import AppButtonSection from "./components/AppButtonSection";
import BackgroundImage from "./assets/bg-clouds.jpg";

const Container = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed;
  text-align: center;
  padding-top: 1em;
`;

const App = () => {
  return (
    <Container>
      <HalfWidthPage>
        <AppButtonSection/>
        <PicturePostPage />
      </HalfWidthPage>
    </Container>
  );
};

export default App;

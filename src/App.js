import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import HalfWidthPage from "./containers/HalfWidthPage";
import AppButtonSection from "./components/AppButtonSection";
import BackgroundImage from "./assets/bg-clouds.jpg";
import FixedFooter from "./components/FixedFooter";

const Container = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed;
  text-align: center;
  font-family: "Noto Serif JP", serif;
  font-size: 0.8em;
  color: white;
`;

const App = () => {
  return (
    <Container>
      <HalfWidthPage>
        <AppButtonSection />
        <PicturePostPage />
        <FixedFooter />
      </HalfWidthPage>
    </Container>
  );
};

export default App;

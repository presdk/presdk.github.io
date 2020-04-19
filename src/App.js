import React from "react";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import styled from "styled-components";
import FixedFooter from "./components/FixedFooter";
import Theme from "./Theme";
import MainHeader from "./components/MainHeader";
import HalfWidthPage from "./containers/HalfWidthPage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

const Container = styled.div`
  text-align: center;
  font-family: "Viga", sans-serif;
  font-size: 1em;
  color: ${Theme.Primary};
`;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainHeader style={{ height: "10em" }} />
        <HalfWidthPage style={{ paddingTop: "9em", paddingBottom: "3em" }}>
          <PicturePostPage />
        </HalfWidthPage>
        <FixedFooter style={{ height: "2em" }} />
      </Container>
    </Provider>
  );
};

export default App;

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
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DefaultStyle = {
  fontFamily: "Viga, sans-serif",
  fontSize: "1em",
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <Container className="mt-4 px-4" style={DefaultStyle}>
        <Row className="sticky-top">
          <Col className="d-xs-block d-sm-none col-xs-12 mb-3">
            <MainHeader />
          </Col>
        </Row>
        <Row>
          <Col className="d-md-block d-none col-md-3 mx-auto text-center">
            <div className="sticky-top">
              <div className="mb-3">
                <MainHeader />
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item active href="#">
                  Gallery
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  Blog
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col xs={12} md={9}>
            <PicturePostPage />
          </Col>
        </Row>
        {/* 
            <HalfWidthPage style={{ paddingTop: "9em", paddingBottom: "3em" }}>
              <PicturePostPage />
            </HalfWidthPage> */}
        <Row>
          <Col>
            <FixedFooter className="fixed-bottom" />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
};

export default App;

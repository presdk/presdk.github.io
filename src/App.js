import React from "react";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import FixedFooter from "./components/FixedFooter";
import MainHeader from "./components/MainHeader";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import Fade from "./animations/Fade";
import styled from "styled-components";

const StyledApp = styled.div`
  * {
    font-family: "Roboto", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "Noto Sans JP", sans-serif;
  }
`;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <StyledApp>
          <Container className="mt-4 px-4">
            <Row className="sticky-top">
              <Col className="d-xs-block d-sm-none col-xs-12 mb-3">
                <MainHeader />
              </Col>
            </Row>
            <Row>
              <Col className="d-md-block d-none col-md-3 mx-auto text-center">
                <Fade className="sticky-top">
                  <div className="mb-3">
                    <MainHeader />
                  </div>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Link to="/gallery">Gallery</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link as="li" to="/blog">
                        Blog
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Fade>
              </Col>
              <Col xs={12} md={9}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/gallery" />}
                  />
                  <Route path="/gallery">
                    <PicturePostPage />
                  </Route>
                  <Route path="/blog">
                    <BlogPage />
                  </Route>
                </Switch>
              </Col>
            </Row>
            <Row>
              <Col>
                <FixedFooter className="fixed-bottom" />
              </Col>
            </Row>
          </Container>
        </StyledApp>
      </Provider>
    </Router>
  );
};

export default App;

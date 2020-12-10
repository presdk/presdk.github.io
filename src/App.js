import React from "react";
import "./App.css";
import PicturePostPage from "./pages/PicturePostPage";
import FixedFooter from "./components/FixedFooter";
import MainHeader from "./components/MainHeader";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Container, Row, Col, ListGroup, Navbar, Nav } from "react-bootstrap";
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

const StyledApp = styled.div `
  * {
    color: black;
    font-family: "Roboto", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "Noto Sans JP", sans-serif;
  }

  a:hover {
    text-decoration-line: none;
  }
`;

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const galleryLink = "/gallery";
const galleryLinkText = < span > 🖼️Gallery < /span>;

const blogLink = "/blog";
const blogLinkText = < span > 📒Blog < /span>;

const App = () => {
    return ( <
        Router >
        <
        Provider store = { store } >
        <
        StyledApp >
        <
        Container fluid >
        <
        Row className = "sticky-top" >
        <
        Col className = "d-xs-block d-sm-none col-xs-12" >
        <
        Navbar variant = "light"
        bg = "white"
        sticky = "top" >
        <
        Navbar.Brand href = "#" > Daoon < /Navbar.Brand> <
        Link to = { galleryLink } >
        <
        Nav.Link as = "div" > { galleryLinkText } < /Nav.Link> <
        /Link> <
        Link to = { blogLink } >
        <
        Nav.Link as = "div" > { blogLinkText } < /Nav.Link> <
        /Link> <
        /Navbar> <
        /Col> <
        /Row> <
        Row >
        <
        Col md = {
            { span: 2, offset: 2 } }
        className = "text-center d-none d-md-block" >
        <
        Fade className = "sticky-top" >
        <
        MainHeader / >
        <
        ListGroup variant = "flush" >
        <
        ListGroup.Item >
        <
        Link to = { galleryLink } > { galleryLinkText } < /Link> <
        /ListGroup.Item> <
        ListGroup.Item >
        <
        Link as = "li"
        to = { blogLink } > { blogLinkText } <
        /Link> <
        /ListGroup.Item> <
        /ListGroup> <
        /Fade> <
        /Col> <
        Col xs = { 12 }
        md = {
            { span: 6 } } >
        <
        Switch >
        <
        Route exact path = "/"
        render = {
            () => < Redirect to = "/gallery" / > }
        /> <
        Route path = "/gallery" >
        <
        PicturePostPage / >
        <
        /Route> <
        Route path = "/blog" >
        <
        BlogPage / >
        <
        /Route> <
        /Switch> <
        /Col> <
        /Row> <
        Row >
        <
        Col >
        <
        FixedFooter className = "fixed-bottom" / >
        <
        /Col> <
        /Row> <
        /Container> <
        /StyledApp> <
        /Provider> <
        /Router>
    );
};

export default App;
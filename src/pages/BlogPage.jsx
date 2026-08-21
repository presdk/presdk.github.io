import React, { useState, useEffect, useCallback } from "react";
import { GetTextPosts } from "../api/TumblrApi";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  failedToLoadPosts,
  startLoadingPosts,
  addPosts,
} from "../actions/posts";
import styled from "styled-components";
import { Accordion, Card } from "react-bootstrap";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const StyledBlogPage = styled.div`
  a {
    color: #6240b8;
  }
  a:hover {
    text-decoration-line: underline !important;
  }
`;

const getEmojifiedTitle = ({title, summary}) => {
  let targetSource = "";

  // post.title is now deprecated and replaced with post.summary
  if (title.includes('[') && title.includes(']')) {
    targetSource = title;
  } else if (summary.includes('[') && summary.includes(']')) {
    targetSource = summary;
  } else {
    return "Unknown title";
  }
  
  const splitIndex = targetSource.indexOf(']');
  if (splitIndex == -1) {
    return "Unknown title";
  }

  const emojiKey = targetSource.substring(0, splitIndex + 1);
  const titleText = targetSource.substring(splitIndex + 1).trim();

  let emoji = "";
  switch (emojiKey) {
    case "[Dev]":
      emoji = "💾 Dev";
      break;
    case "[Invest]":
      emoji = "📈 Invest";
      break;
    case "[Video editing]":
      emoji = "📷 Editing";
      break;
    case "[Curious]":
      emoji = "💭 Curious";
      break;
  }

  return emoji.length > 0 ?
    `${emoji.toUpperCase()} - ${titleText}` : titleText;
};

const BlogPage = (props) => {
  const NumPostsPerPage = 20;

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const textPosts = useSelector((state) => state.textPosts.posts, shallowEqual);
  const hasMorePosts = useSelector((state) => state.textPosts.hasMorePosts);

  const dispatch = useDispatch();
  const showMorePosts = () => {
    dispatch(startLoadingPosts("text"));

    GetTextPosts(NumPostsPerPage, textPosts.length, (retrievedPosts) => {
      if (retrievedPosts && retrievedPosts.length > 0) {
        dispatch(addPosts("text", retrievedPosts));
        setIsLoadingPosts(false);
      } else {
        dispatch(failedToLoadPosts("text"));
      }
    });
  };

  useEffect(() => {
    OnShowMorePosts();
  }, [textPosts]);

  const OnShowMorePosts = useCallback(() => {
    if (isLoadingPosts) {
      return;
    }
    setIsLoadingPosts(true);
    showMorePosts();
  }, [isLoadingPosts]);

  if (textPosts.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <StyledBlogPage>
      <InfiniteScroll
        {...props}
        pageStart={0}
        loadMore={OnShowMorePosts}
        hasMore={hasMorePosts}
        className="mt-3"
        style={{ overflow: "hidden" }}
      >
        {textPosts.map((post) => {
          // Show posts with valid titles
          const { id } = post;
          const emojifiedTitle = getEmojifiedTitle(post);
          const htmlContent = htmlToReactParser.parse(post.body);

          return (
            <div className="mt-2 mb-2">
              <Accordion>
                <Card>
                  <Accordion.Toggle style={{ textAlign: "left" }} eventKey={id}>
                    {emojifiedTitle}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={id}>
                    <Card.Body>{htmlContent}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          );
        })}
      </InfiniteScroll>
    </StyledBlogPage>
  );
};

export default BlogPage;

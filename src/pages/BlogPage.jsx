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
import { Accordion } from "react-bootstrap";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const StyledPostHeaderSection = styled.div`
  hr {
    border: 1px solid #000;
  }

  :hover {
    cursor: pointer;
  }
`;
const PostHeaderSection = (props) => {
  return (
    <StyledPostHeaderSection>
      {props.children}
      <hr />
    </StyledPostHeaderSection>
  );
};

const StyledBlogPage = styled.div`
  a {
    color: #6240b8;
  }
  a:hover {
    text-decoration-line: underline !important;
  }
`;

const getEmojifiedTitle = (title) => {
  if (!(title.includes('[') || title.includes(']'))) {
    return title;
  }

  const splitIndex = title.indexOf(']');
  if (splitIndex == -1) {
    return title;
  }

  const emojiKey = title.substring(0, splitIndex + 1);
  const titleText = title.substring(splitIndex + 1).trim();

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
          const { title, body } = post;
          return (
            <div key={post.id}>
              <Accordion>
                {title && (
                  <Accordion.Toggle eventKey={post.id} as="div">
                    <PostHeaderSection>{getEmojifiedTitle(title)}</PostHeaderSection>
                  </Accordion.Toggle>
                )}
                <Accordion.Collapse eventKey={post.id} as="div">
                  <div className="mt-3 mb-3">{htmlToReactParser.parse(body)}</div>
                </Accordion.Collapse>
              </Accordion>
            </div>
          );
        })}
      </InfiniteScroll>
    </StyledBlogPage>
  );
};

export default BlogPage;

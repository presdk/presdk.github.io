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
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const PostHeaderSection = (props) => {
  const HorizontalDivider = styled.hr`
    border: 1px solid #000;
  `;

  const PostHeader = styled.h4`
    color: #133c55;
  `;

  return (
    <>
      <HorizontalDivider />
      <PostHeader>{props.children}</PostHeader>
      <HorizontalDivider />
    </>
  );
};

const BlogBody = styled.div`
  a {
    color: #6240b8;
  }
`;

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
    <InfiniteScroll
      {...props}
      pageStart={0}
      loadMore={OnShowMorePosts}
      hasMore={hasMorePosts}
      style={{ overflow: "hidden" }}
    >
      {textPosts.map((post) => {
        const { title, body } = post;
        return (
          <div key={post.id} className="mt-5">
            {title && <PostHeaderSection>{title}</PostHeaderSection>}
            <BlogBody>{htmlToReactParser.parse(body)}</BlogBody>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default BlogPage;

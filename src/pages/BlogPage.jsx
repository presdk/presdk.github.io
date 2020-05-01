import React, { useState, useEffect, useCallback } from "react";
import { GetTextPosts } from "../api/TumblrApi";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  failedToLoadPosts,
  startLoadingPosts,
  addPosts,
} from "../actions/posts";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

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
          <div key={post.id} className="mb-5">
            <h4>{title}</h4>
            {htmlToReactParser.parse(body)}
            <hr />
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default BlogPage;

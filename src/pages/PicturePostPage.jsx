import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { GetPhotoPosts } from "../api/TumblrApi";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "react-photo-gallery";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  failedToLoadPosts,
  startLoadingPosts,
  addPosts,
} from "../actions/posts";

function getColumns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) {
    columns = 2;
  }
  return columns;
}

const PicturePostPage = (props) => {
  const NumPostsPerPage = 20;

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const photoPosts = useSelector(
    (state) => state.photoPosts.posts,
    shallowEqual
  );
  const hasMorePosts = useSelector((state) => state.photoPosts.hasMorePosts);

  const dispatch = useDispatch();
  const showMorePosts = () => {
    dispatch(startLoadingPosts("photo"));

    GetPhotoPosts(NumPostsPerPage, photoPosts.length, (retrievedPosts) => {
      if (retrievedPosts && retrievedPosts.length > 0) {
        dispatch(addPosts("photo", retrievedPosts));
        setIsLoadingPosts(false);
      } else {
        dispatch(failedToLoadPosts("photo"));
      }
    });
  };

  useEffect(() => {
    OnShowMorePosts();
  }, [photoPosts]);

  const OnShowMorePosts = useCallback(() => {
    if (isLoadingPosts) {
      return;
    }
    setIsLoadingPosts(true);
    showMorePosts();
  }, [isLoadingPosts]);

  if (photoPosts.length <= 0) {
    return <div>Loading...</div>;
  }

  const images = photoPosts
    .map((post) => {
      const highResPhoto = post.content[0].media[0];

      return {
        src: highResPhoto.url,
        key: post.id_string,
        width: highResPhoto.width,
        height: highResPhoto.height,
      };
    });

  return (
    <InfiniteScroll
      {...props}
      pageStart={0}
      loadMore={OnShowMorePosts}
      hasMore={hasMorePosts}
      style={{ overflow: "hidden" }}
    >
      <Gallery
        photos={images}
        direction="column"
        margin={6}
        columns={getColumns}
      />
    </InfiniteScroll>
  );
};

export default PicturePostPage;

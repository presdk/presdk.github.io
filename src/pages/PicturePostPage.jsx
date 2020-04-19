import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { GetBlogPosts } from "../api/TumblrApi";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "react-grid-gallery";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { failedToLoadPosts, startLoadingPosts, addBlogPosts } from "../actions";

const isValidAspectRatio = (width, height) => {
  const aspectRatio = width / height;
  return aspectRatio >= 0.8;
}

const Image = styled.img`
  max-width: 300px;
  margin: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const PicturePostPage = (props) => {
  const NumPostsPerPage = 20;

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const blogPosts = useSelector(state => state.blogPosts.blogPosts, shallowEqual)
  const hasMorePosts = useSelector(state => state.blogPosts.hasMorePosts);

  const dispatch = useDispatch();
  const showMorePosts = () => {
    dispatch(startLoadingPosts());

    GetBlogPosts(NumPostsPerPage, blogPosts.length, (retrievedPosts) => {
      if (retrievedPosts && retrievedPosts.length > 0) {
        dispatch(addBlogPosts(retrievedPosts));
        setIsLoadingPosts(false);
      } else {
        dispatch(failedToLoadPosts());
      }
    });
  };

  useEffect(() => {
    OnShowMorePosts();
  }, []);

  const OnShowMorePosts = useCallback(() => {
    if (isLoadingPosts) {
      return;
    }
    setIsLoadingPosts(true);
    showMorePosts();
  }, [isLoadingPosts]);

  if (blogPosts.length <= 0) {
    return <div>Loading...</div>;
  }

  const images = blogPosts
    .filter((post) => {
      const { width, height } = post.photos[0].alt_sizes[0];
      return isValidAspectRatio(width, height);
    })
    .map((post) => {
      const highResPhoto = post.photos[0].alt_sizes[0];

      return {
        src: highResPhoto.url,
        key: post.id,
        thumbnail: highResPhoto.url,
        thumbnailWidth: highResPhoto.width,
        thumbnailHeight: highResPhoto.height,
      };
    });

  return (
    <InfiniteScroll
      {...props}
      pageStart={0}
      loadMore={OnShowMorePosts}
      hasMore={hasMorePosts}
      style={{overflow: 'hidden'}}
    >
      <Gallery
        images={images}
        enableImageSelection={false}
        thumbnailImageComponent={({ imageProps }) => <Image {...imageProps}/>}
        backdropClosesModal={true}
      />
    </InfiniteScroll>
  );
};

export default PicturePostPage;

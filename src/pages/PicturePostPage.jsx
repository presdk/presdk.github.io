import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetBlogPosts } from "../api/TumblrApi";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "react-grid-gallery";

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
  const { onLightBoxStateChanged } = props;

  const NumPostsPerPage = 20;
  const [blogPosts, setBlogPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const postsOffset = pageCount * NumPostsPerPage;
    GetBlogPosts(NumPostsPerPage, postsOffset, (fetchedPosts) => {
      if (fetchedPosts && fetchedPosts.length > 0) {
        console.log(fetchedPosts);
        setBlogPosts(blogPosts.concat(fetchedPosts));
        setIsLoading(false);
      } else {
        setHasMoreItems(false);
      }
    });
  }, [pageCount]);

  const OnShowMorePosts = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setPageCount(pageCount + 1);
  };

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
      hasMore={hasMoreItems}
      style={{overflow: 'hidden'}}
    >
      <Gallery
        images={images}
        enableImageSelection={false}
        lightboxWillOpen={() => onLightBoxStateChanged(true)}
        lightboxWillClose={() => onLightBoxStateChanged(false)}
        thumbnailImageComponent={({ imageProps }) => <Image {...imageProps} />}
      />
    </InfiniteScroll>
  );
};

export default PicturePostPage;

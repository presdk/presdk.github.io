import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetBlogPosts } from "../api/TumblrApi";
import Window from "../components/Window";
import InfiniteScroll from "react-infinite-scroller";
import Theme from "../Theme";

const Image = styled.img`
  width: 300px;
  margin: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const PicturePostPage = (props) => {
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

  return blogPosts.length > 0 ? (
    <InfiniteScroll
      {...props}
      pageStart={0}
      loadMore={OnShowMorePosts}
      hasMore={hasMoreItems}
    >
      {blogPosts.map((post) => {
        const firstPhoto = post.photos[0].alt_sizes[0];

        return <Image src={firstPhoto.url} key={post.id} alt="photo post" />;
      })}
    </InfiniteScroll>
  ) : (
    <div>Loading...</div>
  );
};

export default PicturePostPage;

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetBlogPosts } from "../api/TumblrApi";
import Window from "../components/Window";
import InfiniteScroll from "react-infinite-scroller";

const Image = styled.img`
  width: 300px;
`;

const PicturePostPage = () => {
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
    <InfiniteScroll pageStart={0} loadMore={OnShowMorePosts} hasMore={hasMoreItems}>
      {blogPosts.map((post) => {
        const firstPhoto = post.photos[0].alt_sizes[0];

        return (
          <Window className="content" style={{ marginBottom: 10 }}>
            <Image src={firstPhoto.url} key={post.id} />
          </Window>
        );
      })}
    </InfiniteScroll>
  ) : (
    <div>Loading...</div>
  );
};

export default PicturePostPage;

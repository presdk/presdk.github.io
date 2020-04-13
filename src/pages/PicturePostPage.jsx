import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetBlogPosts } from "../api/TumblrApi";
import Window from "../components/Window";

const Image = styled.img`
  width: 300px;
`;

const PicturePostPage = () => {
  const NumPostsPerPage = 20;
  const [blogPosts, setBlogPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const postsOffset = pageCount * NumPostsPerPage;
    GetBlogPosts(NumPostsPerPage, postsOffset, (fetchedPosts) => {
      if (fetchedPosts) {
        console.log(fetchedPosts);
        setBlogPosts(blogPosts.concat(fetchedPosts));
      }
    });
  }, [pageCount]);

  const OnShowMorePosts = () => {
    setPageCount(pageCount + 1);
  };

  return blogPosts.length > 0 ? (
    <>
      {blogPosts.map((post) => {
        const firstPhoto = post.photos[0].alt_sizes[0];

        return (
          <Window style={{ marginBottom: 10}}>
            <Image src={firstPhoto.url} key={post.id} />
          </Window>
        );
      })}
      <button
        onClick={() => {
          OnShowMorePosts();
        }}
      >
        See More
      </button>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default PicturePostPage;

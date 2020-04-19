export const startLoadingPosts = () => ({
  type: "START_LOADING_POSTS",
});

export const addBlogPosts = (blogPosts) => ({
  type: "ADD_BLOG_POSTS",
  addedBlogPosts: blogPosts,
});

export const failedToLoadPosts = () => ({
    type: "FAILED_LOADING_POSTS"
});
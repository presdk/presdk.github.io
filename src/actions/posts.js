export const startLoadingPosts = (postType) => ({
  postType: postType,
  type: "START_LOADING_POSTS",
});

export const addPosts = (postType, posts) => ({
  postType: postType,
  addedPosts: posts,
  type: "ADDED_POSTS",
});

export const failedToLoadPosts = (postType) => ({
  postType: postType,
  type: "FAILED_LOADING_POSTS",
});

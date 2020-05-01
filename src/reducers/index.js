import { combineReducers } from "redux";

const defaultState = {
  posts: [],
  hasMorePosts: true,
};

const createPostsWithPostType = (postType = "") => {
  return (state = defaultState, action) => {
    if (action.postType !== postType) {
      return state;
    }

    switch (action.type) {
      case "START_LOADING_POSTS":
        return {
          ...state,
        };
      case "ADDED_POSTS":
        return {
          ...state,
          posts: [...state.posts, ...action.addedPosts],
        };
      case "FAILED_LOADING_POSTS":
        return {
          ...state,
          hasMorePosts: false,
        };
      default:
        return state;
    }
  };
};

export default combineReducers({
  photoPosts: createPostsWithPostType("photo"),
  textPosts: createPostsWithPostType("text"),
});

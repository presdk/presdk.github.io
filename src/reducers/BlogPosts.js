const defaultState = {
    blogPosts: [],
    hasMorePosts: true,
};

const blogPostsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'START_LOADING_POSTS':
            return {
                ...state,
            };
        case 'ADD_BLOG_POSTS':
            return {
                ...state,
                blogPosts: [...state.blogPosts, ...action.addedBlogPosts],
            };
        case 'FAILED_LOADING_POSTS':
            return {
                ...state,
                hasMorePosts: false
            };
        default:
            return state;
    }
}

export default blogPostsReducer;
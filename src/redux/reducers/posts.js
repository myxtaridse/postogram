import {
  GET_MAIN_POSTS_FAILED,
  GET_MAIN_POSTS_STARTED,
  GET_MAIN_POSTS_SUCCESS,
} from "../actionCreators/posts";

const initialState = {
  isPostsMainAllLoading: true,
  posts: [],
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_POSTS_STARTED:
      return {
        ...state,
        isPostsMainAllLoading: true,
      };

    case GET_MAIN_POSTS_FAILED:
      return {
        ...state,
        isPostsMainAllLoading: false,
      };
    case GET_MAIN_POSTS_SUCCESS:
      return {
        ...state,
        isPostsMainAllLoading: false,
        posts: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

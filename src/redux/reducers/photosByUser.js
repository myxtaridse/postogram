import {
  CREATE_USER_POSTS_FAILED,
  CREATE_USER_POSTS_STARTED,
  CREATE_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILED,
  GET_USER_POSTS_STARTED,
  GET_USER_POSTS_SUCCESS,
  MUTATE_POST_FAILED,
  MUTATE_POST_STARTED,
  MUTATE_POST_SUCCESS,
} from "../actionCreators/photosByUser";

const initialState = {
  postsUser: [],
  isPostsUserLoading: true,
  isPostsMainLoading: true,
  postsMain: [],
};

export const postsByUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_POSTS_STARTED:
      return {
        ...state,
        isPostsUserLoading: true,
      };

    case GET_USER_POSTS_FAILED:
      return {
        ...state,
        isPostsUserLoading: false,
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,

        isPostsUserLoading: false,
        postsUser: action.payload,
      };
    case MUTATE_POST_STARTED:
      return {
        ...state,
        isPostsUserLoading: true,
      };

    case MUTATE_POST_FAILED:
      return {
        ...state,
        isPostsUserLoading: false,
      };
    case MUTATE_POST_SUCCESS:
      return {
        ...state,
        postsUser: action.payload,
        isPostsUserLoading: false,
      };
      case CREATE_USER_POSTS_STARTED:
      return {
        ...state,
        isPostsUserLoading: true,
      };

    case CREATE_USER_POSTS_FAILED:
      return {
        ...state,
        isPostsUserLoading: false,
      };
    case CREATE_USER_POSTS_SUCCESS:
      return {
        ...state,
        postsMain: action.payload,
        isPostsUserLoading: false,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

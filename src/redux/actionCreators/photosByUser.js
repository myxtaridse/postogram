export const GET_USER_POSTS_STARTED = "GET_USER_POSTS_STARTED";
export const GET_USER_POSTS_SUCCESS = "GET_USER_POSTS_SUCCESS";
export const GET_USER_POSTS_FAILED = "GET_USER_POSTS_FAILED";

export const MUTATE_POST_STARTED = "MUTATE_POST_STARTED";
export const MUTATE_POST_SUCCESS = "MUTATE_POST_SUCCESS";
export const MUTATE_POST_FAILED = "MUTATE_POST_FAILED";

export const CREATE_USER_POSTS_STARTED = "CREATE_USER_POSTS_STARTED";
export const CREATE_USER_POSTS_SUCCESS = "CREATE_USER_POSTS_SUCCESS";
export const CREATE_USER_POSTS_FAILED = "CREATE_USER_POSTS_FAILED";

export const getUserPostsSuccess = (postsByUser) => ({
  type: GET_USER_POSTS_SUCCESS,
  payload: postsByUser,
});
export const getUserPostsFailed = (error) => ({
  type: GET_USER_POSTS_FAILED,
  payload: error,
});
export const getUserPostsStarted = () => ({
  type: GET_USER_POSTS_STARTED,
});
export const mutatePostSuccess = () => ({
  type: MUTATE_POST_SUCCESS,
  //payload: photos,
});
export const mutatePostFailed = (error) => ({
  type: MUTATE_POST_FAILED,
  payload: error,
});
export const mutatePostStarted = () => ({
  type: MUTATE_POST_STARTED,
});

export const createUserPostsSuccess = (postsByUser) => ({
  type: CREATE_USER_POSTS_SUCCESS,
  payload: postsByUser,
});
export const createUserPostsFailed = (error) => ({
  type: CREATE_USER_POSTS_FAILED,
  payload: error,
});
export const createUserPostsStarted = () => ({
  type: CREATE_USER_POSTS_STARTED,
});

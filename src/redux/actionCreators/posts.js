export const GET_MAIN_POSTS_STARTED = "GET_MAIN_POSTS_STARTED";
export const GET_MAIN_POSTS_SUCCESS = "GET_MAIN_POSTS_SUCCESS";
export const GET_MAIN_POSTS_FAILED = "GET_MAIN_POSTS_FAILED";

export const getMainPostsSuccess = (posts) => ({
  type: GET_MAIN_POSTS_SUCCESS,
  payload: posts,
});
export const getMainPostsFailed = (error) => ({
  type: GET_MAIN_POSTS_FAILED,
  payload: error,
});
export const getMainPostsStarted = () => ({
  type: GET_MAIN_POSTS_STARTED,
});

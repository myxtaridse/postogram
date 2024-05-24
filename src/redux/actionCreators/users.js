export const GET_USER_STARTED = "GET_USER_STARTED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_USER_AUTHORIZED_SUCCESS = "GET_USER_AUTHORIZED_SUCCESS";
export const GET_USER_AUTHORIZED_FAILED = "GET_USER_AUTHORIZED_FAILED";

export const MUTATE_USER_STARTED = "MUTATE_USER_STARTED";
export const MUTATE_USER_SUCCESS = "MUTATE_USER_SUCCESS";
export const MUTATE_USER_FAILED = "MUTATE_USER_FAILED";

export const getUserSuccess = (users) => ({
  type: GET_USER_STARTED,
  payload: users,
});
export const getUserFailed = (error) => ({
  type: GET_USER_FAILED,
  payload: error,
});
export const getUserStarted = () => ({
  type: GET_USER_SUCCESS,
});

export const getUserAuthorizedSuccess = (users) => ({
  type: GET_USER_AUTHORIZED_SUCCESS,
  payload: users,
});

export const mutateUserSuccess = () => ({
  type: MUTATE_USER_SUCCESS,
  //payload: photos,
});
export const mutateUserFailed = (error) => ({
  type: MUTATE_USER_FAILED,
  payload: error,
});
export const mutateUserStarted = () => ({
  type: MUTATE_USER_STARTED,
});

export const getUserAuthorizedFailed = (error) => ({
  type: GET_USER_AUTHORIZED_FAILED,
  payload: error,
});

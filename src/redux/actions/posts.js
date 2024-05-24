import { api } from "../../api";
import {
  getMainPostsFailed,
  getMainPostsStarted,
  getMainPostsSuccess,
} from "../actionCreators/posts";

export const getMainPostsAll = () => {
  return async (dispatch) => {
    try {
      dispatch(getMainPostsStarted());

      const response = await api.posts.getPostsAll();

      dispatch(getMainPostsSuccess(response.data));
    } catch (error) {
      dispatch(getMainPostsFailed(error, "ошибка"));
    }
  };
};

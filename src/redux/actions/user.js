import axios from "axios";
import { api } from "../../api";

import {
  getUserAuthorizedFailed,
  getUserAuthorizedSuccess,
  getUserFailed,
  getUserStarted,
  getUserSuccess,
  mutateUserStarted,
  mutateUserSuccess,
} from "../actionCreators/users";

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());

      const response = await api.users.getUser(id);

      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailed(error, "ошибка"));
    }
  };
};

export const getAuthorizedUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());

      const res = await axios.get(`http://localhost:3000/postsByUser/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data, id);
      dispatch(getUserAuthorizedSuccess(res.data));
    } catch (error) {
      dispatch(getUserFailed(error, "ошибка"));
    }
  };
};

export const mutateUserAuth = (userId, userEdit) => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());

      const response = await api.users.mutatedAuth({
        url: `${userId}`,
        data: userEdit,
      });

      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailed(error, "ошибка"));
    }
  };
};

export const deleteAuthorizedUser = () => {
  return async (dispatch) => {
    try {
      dispatch(getUserAuthorizedFailed());
    } catch (error) {
      dispatch(getUserFailed(error, "ошибка"));
    }
  };
};

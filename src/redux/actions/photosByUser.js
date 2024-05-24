import { api } from "../../api";

import {
  createUserPostsSuccess,
  getMainPostsFailed,
  getMainPostsStarted,
  getMainPostsSuccess,
  getUserPostsFailed,
  getUserPostsStarted,
  getUserPostsSuccess,
} from "../actionCreators/photosByUser";

export const getUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(getUserPostsStarted());

      const response = await api.postsByUser.getPosts({
        url: `${userId}`,
      });
      dispatch(getUserPostsSuccess(response.data));
    } catch (error) {
      dispatch(getUserPostsFailed(error, "ошибка"));
    }
  };
};

export const toggleLikePost = (userId, postId, postAuthorId) => {
  return async (dispatch, getState) => {
    try {
      const postsAll = getState().postsByUser.postsUser.posts;
      const avatarData = getState().postsByUser.postsUser.avatarUrl;
      const descriptionData = getState().postsByUser.postsUser.description;
      const firstNameData = getState().postsByUser.postsUser.firstName;
      const lastNameData = getState().postsByUser.postsUser.lastName;
      const nicknameData = getState().postsByUser.postsUser.nickname;
      const subscribedData = getState().postsByUser.postsUser.subscribed;
      const subscribersData = getState().postsByUser.postsUser.subscribers;
      const urlData = getState().postsByUser.postsUser.url;

      //const { postForEdit, newPosts } = getUserPagePostData(posts, postId);
      const newPosts = [...postsAll];
      const newPostIndex = newPosts.findIndex((post) => post.id === postId);
      const postForEdit = newPosts[newPostIndex];

      if (postForEdit.likes.includes(userId)) {
        postForEdit.likes = postForEdit.likes.filter((like) => like !== userId);
      } else {
        postForEdit.likes.push(userId);
      }

      await api.postsByUser.mutatedPosts({
        url: `${postAuthorId}`,
        data: {
          id: postAuthorId,
          avatarUrl: avatarData,
          description: descriptionData,
          firstName: firstNameData,
          lastName: lastNameData,
          nickname: nicknameData,
          subscribed: subscribedData,
          subscribers: subscribersData,
          url: urlData,
          posts: newPosts,
        },
      });
      //dispatch(mutatePhotoSuccess());
      const arrayMain = getState().postsByUser.postsUser;
      Object.defineProperty(arrayMain, "posts", {
        value: newPosts,
      });

      dispatch(getUserPostsSuccess(arrayMain));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCommentPost = (nicknameAuthor, postId, postAuthorId, text) => {
  return async (dispatch, getState) => {
    try {
      const {
        posts,
        avatarUrl,
        description,
        firstName,
        lastName,
        nickname,
        subscribed,
        subscribers,
        url,
      } = getState().postsByUser.postsUser;

      //const { postForEdit, newPosts } = getUserPagePostData(posts, postId);
      const newPosts = [...posts];
      const newPostIndex = newPosts.findIndex((post) => post.id === postId);
      const postForEdit = newPosts[newPostIndex];

      postForEdit.comments.push({ nickname: nicknameAuthor, text });

      await api.postsByUser.mutatedPosts({
        url: `${postAuthorId}`,
        data: {
          id: postAuthorId,
          avatarUrl,
          description,
          firstName,
          lastName,
          nickname,
          subscribed,
          subscribers,
          url,
          posts: newPosts,
        },
      });
      //dispatch(mutatePhotoSuccess());
      const arrayMain = getState().postsByUser.postsUser;
      Object.defineProperty(arrayMain, "posts", {
        value: newPosts,
      });

      dispatch(getUserPostsSuccess(arrayMain));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPost = (userId, userEditInfo) => {
  return async (dispatch) => {
    try {
      const response = await api.postsByUser.mutatedPosts({
        url: `${userId}`,
        data: userEditInfo,
      });
      //dispatch(mutatePhotoSuccess());

      dispatch(getUserPostsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const mutateInfoUser = (userId, userEditInfo) => {
  return async (dispatch) => {
    try {
      const response = await api.postsByUser.mutatedPosts({
        url: `${userId}`,
        data: userEditInfo,
      });
      //dispatch(mutatePhotoSuccess());

      dispatch(getUserPostsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (userEditInfo) => {
  return async (dispatch) => {
    try {
      const response = await api.postsByUser.createUserByPosts(userEditInfo);

      console.log(response.data);
      dispatch(createUserPostsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

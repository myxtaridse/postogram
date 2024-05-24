import { api } from "../../api";
import { getPhotoFromState } from "../../utils";
import {
  getPhotosFailed,
  getPhotosStarted,
  getPhotosSuccess,
  mutatePhotoFailed,
  mutatePhotoStarted,
  mutatePhotoSuccess,
  setPhotosTotal,
} from "../actionCreators/photos";

export const getPhotos = (page = 1) => {
  return async (dispatch, getState) => {
    const store = getState();

    try {
      if (page === 1) {
        dispatch(getPhotosStarted);
      }

      const response = await api.photos.getPhotos({
        params: {
          _page: page,
          _limit: 5,
        },
      });

      if (page === 1) {
        dispatch(setPhotosTotal(response.headers["x-total-count"]));
        dispatch(getPhotosSuccess([...response.data]));
      } else {
        // dispatch(setPhotosTotal(response.headers["x-total-count"]));
        dispatch(getPhotosSuccess([...store.photos.photos, ...response.data]));
      }
    } catch (error) {
      dispatch(getPhotosFailed(error, "ошибка"));
    }
  };
};
export const toggleLike = (userId, photoId) => {
  return async (dispatch, getState) => {
    const state = getState();

    const newPhoto = getPhotoFromState(state.photos.photos, photoId);
    if (newPhoto.likes.includes(userId)) {
      newPhoto.likes = newPhoto.likes.filter((like) => like !== userId);
    } else {
      newPhoto.likes.push(userId);
    }

    try {
      const response = await api.photos.mutatedPhotos({
        data: newPhoto,
        url: `/${photoId}`,
      });

      const newPhotos = [...state.photos.photos];
      const photoIndex = newPhotos.findIndex((photo) => photo.id === photoId);
      newPhotos[photoIndex] = response.data;

      dispatch(mutatePhotoSuccess());
      dispatch(getPhotosSuccess(newPhotos));
    } catch (error) {
      dispatch(mutatePhotoFailed(error, "ошибка"));
    }
  };
};
export const sendComment = (isValue, nickname, photoId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const newPhoto = getPhotoFromState(state.photos.photos, photoId);

    newPhoto.comments.push({ nickname, text: isValue });

    try {
      const response = await api.photos.mutatedPhotos({
        data: newPhoto,
        url: `/${photoId}`,
      });

      const newPhotos = [...state.photos.photos];
      const photoIndex = newPhotos.findIndex((photo) => photo.id === photoId);
      newPhotos[photoIndex] = response.data;

      dispatch(mutatePhotoSuccess());
      dispatch(getPhotosSuccess(newPhotos));
    } catch (error) {
      dispatch(mutatePhotoFailed(error, "ошибка"));
    }
  };
};

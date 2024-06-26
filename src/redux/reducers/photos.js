import {
  GET_PHOTOS_FAILED,
  GET_PHOTOS_STARTED,
  GET_PHOTOS_SUCCESS,
  MUTATE_PHOTO_FAILED,
  MUTATE_PHOTO_STARTED,
  MUTATE_PHOTO_SUCCESS,
  SET_PHOTOS_TOTAL,
} from "../actionCreators/photos";

const initialState = {
  photos: [],
  isPhotosLoading: true,
  isMutatedLoading: false,
  totalPhotos: 0,
};

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_STARTED:
      return {
        ...state,
        isPhotosLoading: true,
      };

    case GET_PHOTOS_FAILED:
      return {
        ...state,
        isPhotosLoading: false,
      };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        isPhotosLoading: false,
      };
    case SET_PHOTOS_TOTAL:
      return {
        ...state,
        totalPhotos: action.payload,
      };
    case MUTATE_PHOTO_STARTED:
      return {
        ...state,
        isMutatedLoading: true,
      };

    case MUTATE_PHOTO_FAILED:
      // TODO ADD errors
      return {
        ...state,
        isMutatedLoading: false,
      };
    case MUTATE_PHOTO_SUCCESS:
      // TODO ADD errors
      return {
        ...state,
        isMutatedLoading: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

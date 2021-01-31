import {
    FETCH_VIDEOS,
    ADD_VIDEO,
    DELETE_VIDEO
  } from "../actions/Types";
  
  const initialState = {
    videos: [],
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_VIDEOS:
        return {
          ...state,
          videos: action.data,
        };
  
      case ADD_VIDEO:
        let p = [...state.profiles];
        p.unshift(action.data);
        return {
          ...state,
          profiles: p,
        };
  
      case DELETE_VIDEO:
        return {
          ...state,
          videos: state.videos.filter(
            (video) => video.id !== action.data
          ),
        };
  
      default:
        return state;
    }
  }
  
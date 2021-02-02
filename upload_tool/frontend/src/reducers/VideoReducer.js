import {
    FETCH_VIDEOS,
    ADD_VIDEO,
    DELETE_VIDEO,
    ADD_TEMP_VIDEO,
    DELETE_TEMP_VIDEO,
  } from "../actions/Types";
  
  const initialState = {
    videos: [],
    tempVideos: [],
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_VIDEOS:
        return {
          ...state,
          videos: action.data,
        };
  
      case ADD_VIDEO:
  
      case DELETE_VIDEO:

      case ADD_TEMP_VIDEO:
        let v = [...state.tempVideos];
        v.push(action.data);
        return {
          ...state,
          tempVideos: v,
        };

      case DELETE_TEMP_VIDEO:
        return{
          ...state,
          tempVideos: state.tempVideos.filter(
            (video) => video.id !== action.data
          ),
        }
  
      default:
        return state;
    }
  }
  
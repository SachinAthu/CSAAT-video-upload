import {
    FETCH_VIDEOS,
    ADD_VIDEO,
    DELETE_VIDEO,
  } from "./Types";
  
  // get all videos for a session
export const getVideos = (videos) => (dispatch, getState) => {
    dispatch({
        type: FETCH_VIDEOS,
        data: videos
    })
}

// add a video
export const addVideo = (video) => (dispatch, getState) => {
    // console.log(video)
    dispatch({
        type: ADD_VIDEO,
        data: video
    })
}

// delete a video
export const deleteVideo = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETE_VIDEO,
        data: id
    })
} 


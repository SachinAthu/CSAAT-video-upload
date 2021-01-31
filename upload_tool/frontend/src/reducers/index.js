import { combineReducers } from "redux"
import ProfileReducer from './ProfileReducer'
import SessionReducer from './SessionReducer'
import VideoReducer from './VideoReducer'

export default combineReducers({
    profileReducer: ProfileReducer,
    sessionReducer: SessionReducer,
    videoReducer: VideoReducer,
})
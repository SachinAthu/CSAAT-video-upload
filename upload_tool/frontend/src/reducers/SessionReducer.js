import {
    FETCH_SESSIONS,
    ADD_SESSION,
    SET_ACTIVE_SESSION,
    DELETE_SESSION,
  } from "../actions/Types";
  
  const initialState = {
    sessions: [],
    activeSession: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SESSIONS:
        return {
          ...state,
          sessions: action.data,
        };
  
      case ADD_SESSION:
  
      case SET_ACTIVE_SESSION:
        return {
          ...state,
          activeSession: action.data
        };
  
      case DELETE_SESSION:
        return {
          ...state,
          sessions: state.sessions.filter(
            (session) => session.id !== action.data
          ),
        };
  
      default:
        return state;
    }
  }
  
import {
  FETCH_PROFILES,
  ADD_PROFILE,
  SET_ACTIVE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "../actions/Types";

const initialState = {
  profiles: [],
  activeProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILES:
      return {
        ...state,
        profiles: action.data,
      };

    case ADD_PROFILE:
      let p = [...state.profiles];
      p.unshift(action.data);
      return {
        ...state,
        profiles: p,
      };

    case SET_ACTIVE_PROFILE:
      return {
        ...state,
        activeProfile: action.data
      };

    case UPDATE_PROFILE:

    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id !== action.data
        ),
      };

    default:
      return state;
  }
}

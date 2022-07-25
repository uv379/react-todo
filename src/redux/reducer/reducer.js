import * as types from "../actions/actionType";

const initialState = {
  infos: {},
  info: {},
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOS:
      return {
        ...state,
        infos: action.payload,
      };
    case types.GET_INFO:
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};
export default infoReducer;

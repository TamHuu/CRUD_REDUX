import {
  FETCH_USER_LOGIN,
  FETCH_USER_LOGIN_ERROR,
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGOUT,
  FETCH_USER_REFRESH,
} from "../actions/userAction";

const INIT_STATE = {
  account: {
    email: "",
    auth: null,
    token: "",
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_LOGIN_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case FETCH_USER_LOGIN_SUCCESS:
      console.log(">>>> check redux success");
      return {
        ...state,
        account: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
        },
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        account: {
          email: "",
          token: "",
          auth: false,
        },
      };
    case FETCH_USER_REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          auth: true,
        },
      };
    default:
      return state;
  }
};
export default userReducer;

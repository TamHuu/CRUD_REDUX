import { USER_LOGIN, USER_LOGOUT } from "../actions/userAction";

const INIT_STATE = {
  account: {
    email: "tamle2603",
    auth: false,
  },
};
const email = "abcccc";
const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        email: email,
        auth: true,
      };
    case USER_LOGOUT:
      return {
        email: "",
        auth: false,
      };
    default:
      return state;
  }
};
export default userReducer;

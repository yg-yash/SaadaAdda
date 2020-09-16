/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoggedIn: false,
  signupError: '',
  otpError: '',
  loginError: '',
  forgotPasswordError: '',
  resetPasswordError: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      loginError: '',
    };
  },
  [types.LOGIN_FAILED](state, action) {
    return {
      ...state,
      loginError: action.payload,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.SIGNUP_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.SIGNUP_RESPONSE](state, action) {
    return {
      ...state,
      signupError: '',
    };
  },
  [types.SIGNUP_FAILED](state, action) {
    return {
      ...state,
      signupError: action.payload,
    };
  },
  [types.OTP_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.OTP_RESPONSE](state, action) {
    return {
      ...state,
      otpError: '',
    };
  },
  [types.OTP_FAILED](state, action) {
    return {
      ...state,
      otpError: action.payload,
    };
  },
  [types.FORGOT_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.FORGOT_RESPONSE](state) {
    return {
      ...state,
      forgotPasswordError: '',
    };
  },
  [types.FORGOT_FAILED](state, action) {
    return {
      ...state,
      forgotPasswordError: action.payload,
    };
  },
  [types.RESET_PASSWORD_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.RESET_PASSWORD_RESPONSE](state) {
    return {
      ...state,
      resetPasswordError: '',
    };
  },
  [types.RESET_PASSWORD_FAILED](state, action) {
    return {
      ...state,
      resetPasswordError: action.payload,
    };
  },
});

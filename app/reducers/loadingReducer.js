import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoginLoading: false,
  isSignupLoading: false,
  isOTPLoading: false,
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.LOGIN_ENABLE_LOADER](state) {
    return { ...state, isLoginLoading: true };
  },
  [types.LOGIN_DISABLE_LOADER](state) {
    return { ...state, isLoginLoading: false };
  },
  [types.SIGNUP_ENABLE_LOADER](state) {
    return { ...state, isSignupLoading: true };
  },
  [types.SIGNUP_DISABLE_LOADER](state) {
    return { ...state, isSignupLoading: false };
  },
  [types.OTP_ENABLE_LOADER](state) {
    return { ...state, isOTPLoading: true };
  },
  [types.OTP_DISABLE_LOADER](state) {
    return { ...state, isOTPLoading: false };
  },
  [types.FORGOT_ENABLE_LOADER](state) {
    return { ...state, isForgotPasswordLoading: true };
  },
  [types.FORGOT_DISABLE_LOADER](state) {
    return { ...state, isForgotPasswordLoading: false };
  },
  [types.RESET_PASSWORD_ENABLE_LOADER](state) {
    return { ...state, isResetPasswordLoading: true };
  },
  [types.RESET_PASSWORD_DISABLE_LOADER](state) {
    return { ...state, isResetPasswordLoading: false };
  },
});

import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed(error) {
  return {
    type: types.LOGIN_FAILED,
    payload: error,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  clearToken();
  return {
    type: types.LOG_OUT,
  };
}
export function requestSignup(email, password) {
  return {
    type: types.SIGNUP_REQUEST,
    email,
    password,
  };
}

export function signupFailed(error) {
  return {
    type: types.SIGNUP_FAILED,
    payload: error,
  };
}

export function onSignupResponse(response) {
  return {
    type: types.SIGNUP_RESPONSE,
    response,
  };
}

export function enableSignupLoader() {
  return {
    type: types.SIGNUP_ENABLE_LOADER,
  };
}

export function disableSignupLoader() {
  return {
    type: types.SIGNUP_DISABLE_LOADER,
  };
}
export function requestOTP(email, otp) {
  return {
    type: types.OTP_REQUEST,
    email,
    otp,
  };
}

export function otpFailed(error) {
  return {
    type: types.OTP_FAILED,
    payload: error,
  };
}

export function onOTPResponse(response) {
  return {
    type: types.OTP_RESPONSE,
    response,
  };
}

export function enableOTPLoader() {
  return {
    type: types.OTP_ENABLE_LOADER,
  };
}

export function disableOTPLoader() {
  return {
    type: types.OTP_DISABLE_LOADER,
  };
}

async function clearToken() {
  await AsyncStorage.removeItem('token');
}

export function requestForgotPassword(email) {
  return {
    type: types.FORGOT_REQUEST,
    email,
  };
}

export function forgotPasswordFailed(error) {
  return {
    type: types.FORGOT_FAILED,
    payload: error,
  };
}

export function onForgotPasswordResponse(response) {
  return {
    type: types.FORGOT_RESPONSE,
    response,
  };
}

export function enableForgotLoader() {
  return {
    type: types.FORGOT_ENABLE_LOADER,
  };
}

export function disableForgotLoader() {
  return {
    type: types.FORGOT_DISABLE_LOADER,
  };
}
export function requestResetPassword(email, otp, password) {
  return {
    type: types.RESET_PASSWORD_REQUEST,
    email,
    otp,
    password,
  };
}

export function resetPasswordFailed(error) {
  return {
    type: types.RESET_PASSWORD_FAILED,
    payload: error,
  };
}

export function onResetPasswordResponse(response) {
  return {
    type: types.RESET_PASSWORD_RESPONSE,
    response,
  };
}

export function enableResetPasswordLoader() {
  return {
    type: types.RESET_PASSWORD_ENABLE_LOADER,
  };
}

export function disableResetPasswordLoader() {
  return {
    type: types.RESET_PASSWORD_DISABLE_LOADER,
  };
}

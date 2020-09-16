import { put, call, takeEvery } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from 'app/actions/loginActions';
import * as types from 'app/actions/types';
import * as navigationService from 'app/navigation/NavigationService';

async function loginApi(username, password) {
  return await Auth.signIn({
    username,
    password,
  });
}
function signUpApi(email, password) {
  return Auth.signUp({
    username: email,
    password,
  });
}
function verifyOtpApi(email, otp) {
  return Auth.confirmSignUp(email, otp);
}
async function forgotPasswordApi(email) {
  return await Auth.forgotPassword(email);
}
async function resetPasswordApi(email, otp, password) {
  return await Auth.forgotPasswordSubmit(email, otp, password);
}

function* loginAsync(action) {
  try {
    yield put(loginActions.enableLoader());
    const response = yield call(loginApi, action.username, action.password);
    yield call(storeToken, response.signInUserSession.idToken.jwtToken);
    yield put(loginActions.onLoginResponse());
    yield put(loginActions.disableLoader({}));
  } catch (error) {
    if (error.message) {
      yield put(loginActions.loginFailed(error.message));
      yield put(loginActions.disableLoader());
      return;
    }
    yield put(loginActions.signupFailed('Something went wrong'));
    yield put(loginActions.disableLoader());
  }
}
function* signupAsync(action) {
  try {
    yield put(loginActions.enableSignupLoader());
    const response = yield call(signUpApi, action.email, action.password);
    yield put(loginActions.onSignupResponse(response.data));
    yield put(loginActions.disableSignupLoader({}));

    navigationService.default.navigate('OTP', action.email);
  } catch (error) {
    if (error.message) {
      yield put(loginActions.signupFailed(error.message));
      yield put(loginActions.disableSignupLoader());
      return;
    }

    yield put(loginActions.signupFailed('Something went wrong'));
    yield put(loginActions.disableSignupLoader());
  }
}
function* verifyOtpAsync(action) {
  try {
    yield put(loginActions.enableOTPLoader());
    const response = yield call(verifyOtpApi, action.email, action.otp);
    yield put(loginActions.onOTPResponse(response.data));
    yield put(loginActions.disableOTPLoader({}));
    navigationService.default.resetRoot();
  } catch (error) {
    if (error.message) {
      yield put(loginActions.otpFailed(error.message));
      yield put(loginActions.disableOTPLoader());
      return;
    }

    yield put(loginActions.otpFailed('Something went wrong'));
    yield put(loginActions.disableOTPLoader());
  }
}

function* forgotPasswordAsync(action) {
  try {
    yield put(loginActions.enableForgotLoader());
    yield call(forgotPasswordApi, action.email);
    yield put(loginActions.onForgotPasswordResponse());
    yield put(loginActions.disableForgotLoader({}));
    navigationService.default.navigate('Reset Password', action.email);
  } catch (error) {
    if (error.message) {
      yield put(loginActions.forgotPasswordFailed(error.message));
      yield put(loginActions.disableForgotLoader());
      return;
    }
    yield put(loginActions.forgotPasswordFailed('Something went wrong'));
    yield put(loginActions.disableForgotLoader());
  }
}

function* resetPasswordAsync(action) {
  try {
    yield put(loginActions.enableResetPasswordLoader());
    yield call(resetPasswordApi, action.email, action.otp, action.password);
    yield put(loginActions.onResetPasswordResponse());
    yield put(loginActions.disableResetPasswordLoader({}));
    navigationService.default.resetRoot();
  } catch (error) {
    if (error.message) {
      yield put(loginActions.resetPasswordFailed(error.message));
      yield put(loginActions.disableResetPasswordLoader());
      return;
    }
    yield put(loginActions.resetPasswordFailed('Something went wrong'));
    yield put(loginActions.disableResetPasswordLoader());
  }
}

function storeToken(token) {
  AsyncStorage.setItem('token', token);
}

export function* login() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
}

export function* signup() {
  yield takeEvery(types.SIGNUP_REQUEST, signupAsync);
}

export function* verifyOtp() {
  yield takeEvery(types.OTP_REQUEST, verifyOtpAsync);
}
export function* forgotPassword() {
  yield takeEvery(types.FORGOT_REQUEST, forgotPasswordAsync);
}
export function* resetPassword() {
  yield takeEvery(types.RESET_PASSWORD_REQUEST, resetPasswordAsync);
}

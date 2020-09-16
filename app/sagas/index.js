/**
 *  Redux saga class init
 */
import { all } from 'redux-saga/effects';
import {
  login,
  signup,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from './loginSaga';

export default function* watch() {
  yield all([
    login(),
    signup(),
    verifyOtp(),
    forgotPassword(),
    resetPassword(),
  ]);
}

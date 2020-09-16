/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as foodReducer from './foodReducer';
import * as bookingReducer from './bookingReducer';
import * as tablesReducer from './tablesReducer';
export default Object.assign(
  loginReducer,
  loadingReducer,
  themeReducer,
  foodReducer,
  bookingReducer,
  tablesReducer,
);

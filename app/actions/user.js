import * as types from './types';

const loadingUserBookings = () => ({ type: types.LOADING_USER_BOOKINGS });

export const addUserBookings = (table, tableType, timing) => {
  loadingUserBookings();
  return {
    type: types.ADD_USER_BOOKINGS,
    payload: { table, tableType, timing },
  };
};

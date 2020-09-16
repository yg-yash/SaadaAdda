import * as types from './types';

const loadingBookedtable = () => ({ type: types.LOADING_BOOK_TABLE });

export const bookTable = (tableNum, timing, tableType) => {
  loadingBookedtable();
  return { type: types.BOOK_TABLE, payload: { tableNum, timing, tableType } };
};

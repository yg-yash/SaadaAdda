import * as types from './types';

const loadingNormalTable = () => ({ type: types.LOADING_NORMAL_TABLE });

export const getNormalTables = () => {
  loadingNormalTable();
  return { type: types.GET_NORMAL_TABLES };
};

export const setNormalTables = tables => {
  loadingCouplesTable();
  return { type: types.SET_NORMAL_TABLES, payload: tables };
};

const loadingCouplesTable = () => ({ type: types.LOADING_COUPLES_TABLE });

export const getCouplesTables = () => {
  loadingCouplesTable();
  return { type: types.GET_COUPLE_TABLES };
};

export const setCoupleTables = tables => {
  loadingCouplesTable();
  return { type: types.SET_COUPLES_TABLE, payload: tables };
};

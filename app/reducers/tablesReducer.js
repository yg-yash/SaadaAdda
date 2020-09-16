import * as types from 'app/actions/types';
import createReducer from 'app/lib/createReducer';

const initialState = {
  normalTables: {
    loading: false,
    tables: [
      {
        tableNum: 1,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 2,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 3,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 4,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 5,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 6,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 7,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 8,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 9,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 10,
        avaliable: true,
        selected: false,
      },
    ],
  },
  coupleTables: {
    loading: false,
    tables: [
      {
        tableNum: 1,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 2,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 3,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 4,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 5,
        avaliable: false,
        selected: false,
      },
      {
        tableNum: 6,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 7,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 8,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 9,
        avaliable: true,
        selected: false,
      },
      {
        tableNum: 10,
        avaliable: true,
        selected: false,
      },
    ],
  },
};

export const tablesReducer = createReducer(initialState, {
  [types.LOADING_NORMAL_TABLE](state) {
    return {
      ...state,
      normalTables: { ...state.normalTables, loading: true },
    };
  },
  [types.GET_NORMAL_TABLES](state) {
    return {
      ...state,
      normalTables: {
        ...state.normalTables,
        loading: false,
      },
    };
  },
  [types.SET_NORMAL_TABLES](state, action) {
    return {
      ...state,
      normalTables: {
        tables: action.payload,
        loading: false,
      },
    };
  },
  [types.LOADING_COUPLES_TABLE](state) {
    return {
      ...state,
      coupleTables: { ...state.coupleTables, loading: true },
    };
  },
  [types.GET_COUPLE_TABLES](state) {
    return {
      ...state,
      couplesTables: {
        ...state.coupleTables,
        loading: false,
      },
    };
  },
  [types.SET_COUPLES_TABLE](state, action) {
    return {
      ...state,
      coupleTables: {
        tables: action.payload,
        loading: false,
      },
    };
  },
});

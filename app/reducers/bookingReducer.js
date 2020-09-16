import * as types from 'app/actions/types';
import createReducer from 'app/lib/createReducer';
const initialState = {
  bookedTables: [],
  loading: false,
  recentBookings: [],
  recentBookingsLoading: false,
};

export const bookingReducer = createReducer(initialState, {
  [types.LOADING_BOOK_TABLE](state) {
    return { ...state, loading: true };
  },
  [types.BOOK_TABLE](state, action) {
    const isTable = state.bookedTables.find(
      item => item.tableNum === action.payload.tableNum,
    );

    if (isTable) {
      state.bookedTables.map(table => {
        if (table.tableNum === action.payload.tableNum) {
          table.timings.push(action.payload.timing);

          return table;
        }
        return table;
      });
    }

    if (!isTable) {
      return {
        ...state,
        bookedTables: [
          ...state.bookedTables,
          {
            tableNum: action.payload.tableNum,
            timings: [action.payload.timing],
            items: [],
            tableType: action.payload.tableType,
          },
        ],
        loading: false,
      };
    }
    return state;
  },
  [types.LOADING_USER_BOOKINGS](state) {
    return { ...state, loading: true };
  },
  [types.ADD_USER_BOOKINGS](state, action) {
    return {
      ...state,
      recentBookings: [...state.recentBookings, action.payload],
    };
  },
});

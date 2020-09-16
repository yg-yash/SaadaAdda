import * as types from 'app/actions/types';
import data from 'app/constants/data';
import createReducer from 'app/lib/createReducer';
const initialState = {
  cartItems: {
    loading: false,
    list: [],
    total: 0,
  },
  sliderImages: {
    loading: false,
    list: [
      require('app/assets/images/banquethall.jpg'),
      require('app/assets/images/reservation.jpg'),
      require('app/assets/images/coupletable.jpg'),
    ],
  },
  itemsList: {
    loading: false,
    list: [],
  },
  mostPopular: {
    loading: false,
    list: [
      {
        id: 1,
        name: 'burger',
        image: require('app/assets/images/burger.jpg'),
        veg: true,
        amount: 70,
        quantity: 1,
      },
      {
        id: 2,
        name: 'pizza',
        image: require('app/assets/images/pizza.jpg'),
        veg: true,
        amount: 70,
        quantity: 1,
      },
      {
        id: 3,
        name: 'rolls',
        image: require('app/assets/images/rolls.jpg'),
        veg: true,
        quantity: 1,
        amount: 70,
      },
      {
        id: 4,
        name: 'dal',
        image: require('app/assets/images/dal.jpg'),
        veg: true,
        quantity: 1,
        amount: 70,
      },
      {
        id: 5,
        name: 'wrap',
        image: require('app/assets/images/wrap.jpg'),
        veg: false,
        amount: 70,
        quantity: 1,
      },
      {
        id: 6,
        name: 'paneer',
        image: require('app/assets/images/paneer.jpg'),
        veg: true,
        amount: 70,
        quantity: 1,
      },
      {
        id: 7,
        name: 'ice-cream',
        image: require('app/assets/images/icecream.jpeg'),
        selected: false,
        quantity: 1,
        amount: 70,
      },
      {
        id: 8,
        name: 'chaap',
        image: require('app/assets/images/chaap.jpg'),
        veg: true,
        quantity: 1,
        amount: 70,
      },
    ],
  },
  categories: {
    loading: false,
    list: data,
  },
  itemsCount: 0,
};

export const foodReducer = createReducer(initialState, {
  ['LOADING_ITEM'](state) {
    return { ...state, loading: true };
  },
  [types.LOADING_SLIDER_DATA](state) {
    return {
      ...state,
      sliderImages: { ...state.sliderImages, loading: true },
    };
  },
  [types.GET_SLIDER_DATA](state) {
    return {
      ...state,
      sliderImages: { ...state.sliderImages, loading: false },
    };
  },
  [types.LOADING_POPULAR_DATA](state) {
    return { ...state, mostPopular: { ...state.mostPopular, loading: true } };
  },
  [types.GET_MOST_POPULAR](state) {
    return {
      ...state,
      mostPopular: { ...state.mostPopular, loading: false },
    };
  },
  [types.LOADING_CATEGORIES](state) {
    return { ...state, categories: { ...state.categories, loading: true } };
  },
  [types.GET_CATEGORIES](state) {
    return {
      ...state,
      categories: { ...state.categories, loading: false },
    };
  },
  [types.GET_CATEGORY_ITEMS](state, action) {
    const getItemList = state.categories.list.find(
      item => item.id === action.payload,
    );
    state.itemsList.list = getItemList;
    return { ...state, itemsList: { ...state.itemsList, loading: false } };
  },
  [types.LOADING_CATEGORY_ITEMS](state) {
    return { ...state, itemsList: { ...state.itemsList, loading: true } };
  },
  [types.ADD_TO_CART](state, action) {
    let addedItem = state.itemsList.list.foodList.find(
      item => item.id === action.payload.id,
    );

    let existed_item = state.cartItems.list.find(
      item => action.payload.id === item.id,
    );
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          total: state.cartItems.total + addedItem.amount,
        },
        itemsCount: state.itemsCount + 1,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.cartItems.total + addedItem.amount;
      return {
        ...state,
        cartItems: {
          list: [...state.cartItems.list, addedItem],
          loading: false,
          total: newTotal,
        },
        itemsCount: state.itemsCount + 1,
      };
    }
  },
  [types.ADD_QUANTITY](state, action) {
    let addeditem = state.cartItems.list.find(
      item => item.id === action.payload,
    );

    addeditem.quantity += 1;
    let newTotal = state.cartItems.total + addeditem.amount;
    return {
      ...state,
      cartItems: {
        ...state.cartItems,
        total: newTotal,
      },
      itemsCount: state.itemsCount + 1,
    };
  },
  [types.SUB_QUANTITY](state, action) {
    let subtractItem = state.cartItems.list.find(
      item => item.id === action.payload,
    );

    if (subtractItem.quantity === 1) {
      let new_items = state.cartItems.list.filter(
        item => item.id !== action.payload,
      );

      const newFoodList = state.itemsList.list.foodList.map(foodItem => {
        if (foodItem.id === action.payload) {
          foodItem.quantity = 0;
        }
        return foodItem;
      });

      let subnewTotal = state.cartItems.total - subtractItem.amount;
      return {
        ...state,
        cartItems: {
          list: new_items,
          total: subnewTotal,
        },
        itemsList: {
          ...state.itemsList,
          list: {
            ...state.itemsList.list,
            foodList: newFoodList,
          },
        },
        itemsCount: state.itemsCount - 1,
      };
    } else {
      subtractItem.quantity -= 1;
      let subTotal = state.cartItems.total - subtractItem.amount;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          total: subTotal,
        },
        itemsCount: state.itemsCount - 1,
      };
    }
  },
  [types.LOADING_CART](state) {
    return { ...state, cartItems: { ...state.cartItems, loading: true } };
  },
  [types.GET_CART_ITEMS](state) {
    return { ...state, cartItems: { ...state.cartItems, loading: false } };
  },
  [types.EMPTY_CART](state) {
    state.itemsList.list.foodList.map(item => {
      item.quantity = 0;
      return item;
    });

    return {
      ...state,
      cartItems: { list: [], loading: false, total: 0 },
      itemsList: { list: [], loading: false },
      itemsCount: 0,
    };
  },
  // [types.CLEAR_ITEM_LIST](state) {
  //   return {
  //     ...state,
  //     itemsList: [],
  //   };
  // },
});

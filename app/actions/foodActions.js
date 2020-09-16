import * as types from './types';

export const startLoading = () => {
  return { type: types.LOADING_ITEM };
};

export const getSliderList = () => {
  loadingSliderData();
  return { type: types.GET_SLIDER_DATA };
};

const loadingSliderData = () => {
  return { type: types.LOADING_SLIDER_DATA };
};

export const getMostPopular = () => {
  loadingPopularData();
  return { type: types.GET_MOST_POPULAR };
};

const loadingPopularData = () => {
  return { type: types.LOADING_POPULAR_DATA };
};

const loadingCategories = () => {
  return { type: types.LOADING_CATEGORIES };
};

export const getCategories = () => {
  loadingCategories();
  return { type: types.GET_CATEGORIES };
};

const loadingCategoryList = () => {
  return { type: types.LOADING_CATEGORY_ITEMS };
};

export const getCategoryItems = id => {
  loadingCategoryList();
  return { type: types.GET_CATEGORY_ITEMS, payload: id };
};

const loadingCart = () => {
  return { type: types.LOADING_CART };
};

export const getCartData = () => {
  loadingCart();
  return { type: types.GET_CART_ITEMS };
};
export const addToCart = item => {
  return { type: types.ADD_TO_CART, payload: item };
};

export const emptyCart = () => {
  return { type: types.EMPTY_CART };
};

export const addQuantity = id => {
  return { type: types.ADD_QUANTITY, payload: id };
};
export const removeQuantity = id => {
  return { type: types.SUB_QUANTITY, payload: id };
};

export const clearItemsList = () => {
  return { type: types.CLEAR_ITEM_LIST };
};

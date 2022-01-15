import { configureStore } from '@reduxjs/toolkit';
import ProductListReducer from './redux/Slices/ProductList';
import ProductItemReducer from './redux/Slices/ProductItem';

export const store = configureStore({
  reducer: { productList: ProductListReducer, productItem: ProductItemReducer },
});

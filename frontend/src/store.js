import { configureStore } from '@reduxjs/toolkit';
import ProductListReducer from './redux/Slices/ProductList';
import ProductItemReducer from './redux/Slices/ProductItem';
import CartReducer from './redux/Slices/Cart';
import UserReducer from './redux/Slices/User';
import OrderReducer from './redux/Slices/Order';
import UserListReducer from './redux/Slices/UserList';

export const store = configureStore({
  reducer: {
    productList: ProductListReducer,
    productItem: ProductItemReducer,
    cart: CartReducer,
    user: UserReducer,
    order: OrderReducer,
    userList: UserListReducer,
  },
});

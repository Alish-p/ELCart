import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Thunks
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product, qty }) => {
    const item = { ...product, qty };

    let items = localStorage.getItem('cart');

    // first time storing in LS
    if (!items) {
      localStorage.setItem('cart', JSON.stringify([item]));
      return item;
    }

    items = JSON.parse(items);
    // if cart is in LS
    if (items) {
      let i = items.findIndex((_item) => _item._id === item._id);

      if (i > -1) items[i] = item;
      else items.push(item);
      localStorage.setItem('cart', JSON.stringify(items));
    }
    return item;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id) => {
    let items = JSON.parse(localStorage.getItem('cart'));

    items = items.filter((i) => id !== i._id);

    localStorage.setItem('cart', JSON.stringify(items));

    return { id };
  }
);

export const saveShippingAddress = createAsyncThunk(
  'cart/saveShippingAddress',
  async (address) => {
    localStorage.setItem('shippingAddress', JSON.stringify(address));

    return address;
  }
);
export const savePaymentMethod = createAsyncThunk(
  'cart/savePaymentMethod',
  async ({ payment }) => {
    localStorage.setItem('paymentMethod', JSON.stringify(payment));

    return payment;
  }
);

const initialState = {
  // fetch from ls
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || null,
  paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || null,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [addToCart.fulfilled]: (state, { payload }) => {
      const index = state.cartItems.findIndex((i) => i._id === payload._id);
      if (index > -1) {
        state.cartItems[index] = { ...payload };
      } else {
        state.cartItems.push({ ...payload });
      }
    },

    [removeFromCart.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== payload.id
      );
    },
    [saveShippingAddress.fulfilled]: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    [savePaymentMethod.fulfilled]: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = cartSlice.actions;

export default cartSlice.reducer;

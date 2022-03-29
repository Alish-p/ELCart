import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (
    { taxPrice, shippingPrice, totalPrice },
    { rejectWithValue, getState }
  ) => {
    try {
      const { cart, user } = getState();
      // adding product id
      const orderItems = cart.cartItems.map((i) => ({ ...i, product: i._id }));
      const order = {
        orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      const response = await axios.post('/api/orders', order, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      const response = await axios.get(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const payOrder = createAsyncThunk(
  'order/payOrder',
  async ({ orderId, paymentDetails }, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      const response = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentDetails,
        {
          headers: { Authorization: `Bearer ${user.userInfo.token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      const response = await axios.get(`/api/orders`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  orders: [],
  order: {
    shippingAddress: {
      address: '',
      city: '',
      country: '',
    },
    orderItems: [],
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  },
  error: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state, { payload }) => {
      state.order = {
        shippingAddress: {
          address: '',
          city: '',
          country: '',
        },
        orderItems: [],
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
      };
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.loading = true;
      state.order = {};
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    [placeOrder.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.order = {};
    },
    [fetchOrder.pending]: (state) => {
      state.loading = true;
      state.order = {};
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    [fetchOrder.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.order = {};
    },
    [payOrder.pending]: (state) => {
      state.loading = true;
      state.order = {};
    },
    [payOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    [payOrder.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.order = {};
    },
    [fetchAllOrders.pending]: (state) => {
      state.loading = true;
      state.orders = [];
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    [fetchAllOrders.rejected]: (state, { payload }) => {
      console.log(payload);
      state.error = payload;
      state.loading = false;
      state.orders = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchProducts = createAsyncThunk(
  'productList/fetchProducts',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/products');
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  products: [],
  error: '',
};

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
      state.products = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = productListSlice.actions;

export default productListSlice.reducer;

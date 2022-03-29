import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchProduct = createAsyncThunk(
  'productList/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  product: {
    price: '',
    countInStock: '',
    name: '',
    description: '',
    image: '',
    brand: '',
    category: '',
  },
  error: '',
};

export const productItem = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.loading = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    [fetchProduct.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.product = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = productItem.actions;

export default productItem.reducer;

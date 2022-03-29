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

export const deleteProduct = createAsyncThunk(
  'productList/deleteProduct',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  'productList/updateProduct',
  async ({ id, product }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.put(`/api/products/${id}`, product, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'productList/createProduct',
  async ({ product }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.post(`/api/products`, product, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
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
  updated: false,
};

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    resetUpdated: (state) => {
      state.updated = false;
    },
  },
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
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product._id !== payload._id
      );
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
      state.updated = false;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.updated = true;
      state.products = state.products.map((product) => {
        if (product._id === payload._id) {
          return payload;
        } else {
          return product;
        }
      });
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
    },
    [createProduct.pending]: (state) => {
      state.loading = true;
      state.updated = false;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.updated = true;

      state.products.push(payload);
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetUpdated } = productListSlice.actions;

export default productListSlice.reducer;

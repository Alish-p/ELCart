import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchUsers = createAsyncThunk(
  'productList/fetchUsers',
  async (obj, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const fetchUser = createAsyncThunk(
  'productList/fetchUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  'productList/updateUser',
  async ({ id, values }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.put(
        `/api/users/${id}`,
        { ...values },
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

export const deleteUser = createAsyncThunk(
  'productList/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.delete(`/api/users/${id}`, {
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
  users: [],
  error: '',
  currentUser: {},
};

export const userListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.users = [];
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [fetchUsers.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.users = [];
    },
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.currentUser = [];
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.currentUser = [];
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.currentUser = {};
    },
    [updateUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
      state.currentUser = {};
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.filter((user) => user._id !== payload._id);
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = userListSlice.actions;

export default userListSlice.reducer;

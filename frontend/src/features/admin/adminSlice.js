import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  sellers: [],
  adminOrders: [],
  adminEvents: [],
  allProducts: [],
  loading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${server}/user/admin-all-users`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.users;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deletUser",
  async (id, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSellers = createAsyncThunk(
  "seller/getAllSellers",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${server}/shop/admin-all-sellers`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.sellers);
      return response.data.sellers;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteSeller = createAsyncThunk(
  "seller/deleteSeller",
  async (id, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.delete(
        `${server}/shop/delete-seller/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllAdminEvents = createAsyncThunk(
  "events/getAllAdminEvents",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${server}/event/admin-all-events`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAdminOrders = createAsyncThunk(
  "orders/getAllAdminOrders",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${server}/order/admin-all-orders/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.orders;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.reponse.data);
    }
  }
);

//get all products Admin
export const getAllAdminProducts = createAsyncThunk(
  "products/getAllAdminProducts",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${server}/product/admin-all-products`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.products;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const currentUsers = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.users = currentUsers;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllSellers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        const currentSellers = state.sellers.filter(
          (seller) => seller._id !== action.payload._id
        );
        state.sellers = currentSellers;
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllAdminEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdminEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllAdminEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllUsers = (state) => state.admin.users;
export const selectAllUsersLoading = (state) => state.admin.loading;
export const selectAllSellers = (state) => state.admin.sellers;
export const selectAllSellersLoading = (state) => state.admin.loading;
export const selectAllAdminEvents = (state) => state.admin.adminEvents;
export const selectAdminEventsLoading = (state) => state.admin.loading;
export const selectAdminOrders = (state) => state.admin.adminOrders;
export const selectAdminOrdersLoading = (state) => state.admin.loading;
export const selectAdminAllProducts = (state) => state.admin.allProducts;
export const selectAdminProductsLoading = (state) => state.admin.loading;

export default adminSlice.reducer;

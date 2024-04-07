import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const initialState = {
  seller: null,
  sellerToken: null,
  shopProducts: [],
  shopOrders: [],
  shopEvents: [],
  loading: false,
  error: null,
};

export const LoadSeller = createAsyncThunk(
  "seller/LoadSeller",
  async (_, { rejectWithValue, getState }) => {
    const sellerToken = getState().shop.sellerToken;
    try {
      const response = await axios.get(`${server}/shop/getSeller`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
      });
      return response.data.seller;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//get All Products from a shop
export const getShopProducts = createAsyncThunk(
  "products/getShopProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${server}/product/get-all-products-shop/${id}`
      );
      return response.data.products;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//delete product of shop
export const deleteShopProduct = createAsyncThunk(
  "products/deleteShopProduct",
  async (id, { rejectWithValue, getState }) => {
    const sellerToken = getState().shop.sellerToken;
    try {
      const response = await axios.delete(
        `${server}/product/delete-shop-product/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );
      return response.data.product;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllShopOrders = createAsyncThunk(
  "orders/getAllShopOrders",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${server}/order/get-seller-all-orders/${sellerId}`
      );
      return response.data.orders;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getShopEvents = createAsyncThunk(
  "events/getShopEvents",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${server}/event/get-all-events-shop/${id}`
      );
      return response.data.events;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShopEvent = createAsyncThunk(
  "events/deleteShopEvent",
  async (id, { rejectWithValue, getState }) => {
    const sellerToken = getState().shop.sellerToken;
    try {
      const response = await axios.delete(
        `${server}/event/delete-shop-event/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );
      return response.data.event;
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopLogin: (state, action) => {
      state.seller = action.payload.seller;
      state.sellerToken = action.payload.sellerToken;
    },
    logoutSeller: (state) => {
      state.seller = null;
      state.sellerToken = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(LoadSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoadSeller.fulfilled, (state, action) => {
        state.seller = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(LoadSeller.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getShopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.shopProducts = action.payload;
      })
      .addCase(getShopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteShopProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShopProduct.fulfilled, (state, action) => {
        state.loading = false;
        const currentProducts = state.shopProducts.filter(
          (product) => product._id !== action.payload._id
        );
        state.shopProducts = currentProducts;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteShopProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllShopOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShopOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.shopOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllShopOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getShopEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.shopEvents = action.payload;
      })
      .addCase(getShopEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteShopEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShopEvent.fulfilled, (state, action) => {
        state.loading = false;
        const currentEvents = state.shopEvents.filter(
          (event) => event._id !== action.payload._id
        );
        state.ShopEvents = currentEvents;
        toast.success("Event deleted successfully");
      })
      .addCase(deleteShopEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setShopLogin, logoutSeller } = shopSlice.actions;
export const selectSeller = (state) => state.shop.seller;
export const selectSellerLoading = (state) => state.shop.loading;
export const selectSellerError = (state) => state.shop.error;
export const selectAllShopProducts = (state) => state.shop.shopProducts;
export const selectAllProductsLoading = (state) => state.shop.loading;
export const selectAllShopOrders = (state) => state.shop.shopOrders;
export const selectShopOrderLoading = (state) => state.shop.loading;
export const selectAllShopEvents = (state) => state.shop.shopEvents;
export const selectShopEventsLoading = (state) => state.shop.loading;

export default shopSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/product/get-all-products`);
      return response.data.allProducts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//create Products
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      name,
      description,
      category,
      originalPrice,
      discountPrice,
      stock,
      shopId,
      images,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${server}/product/create-product`, {
        name,
        description,
        category,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      });
      return response.data.product;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product) {
        product.stock -= quantity;
        product.sold_out += quantity;
      }
    },
    updateProductAfterRefund: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product) {
        product.stock += quantity;
        product.sold_out -= quantity;
      }
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProductStock } = productSlice.actions;
export default productSlice.reducer;
export const selectAllProducts = (state) => state.products.products;
export const selectError = (state) => state.products.error;
export const selectProductsLoading = (state) => state.products.loading;

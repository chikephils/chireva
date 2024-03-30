import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  wishListQuantity: localStorage.getItem("wishListQuantity")
    ? parseInt(localStorage.getItem("wishlistQuantity"))
    : 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishList(state, action) {
      const { item } = action.payload;
      const existingItem = state.wishlistItems.find(
        (wishlistItem) => wishlistItem._id === item._id
      );

      if (!existingItem) {
        state.wishlistItems.push(item);
        state.wishListQuantity += 1;
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
        localStorage.setItem("wishListQuantity", state.wishListQuantity.toString());
      } else {
        return state.wishlistItems;
      }
    },
    removeFromWishList(state, action) {
      const { item } = action.payload;
      const filteredWishList = state.wishlistItems.filter(
        (wishlistItem) => wishlistItem._id !== item._id
      );
      state.wishlistItems = filteredWishList;
      state.wishListQuantity -= 1;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      localStorage.setItem("wishListQuantity", state.wishListQuantity.toString());
    },

    clearWishList(state, action) {
      state.wishlistItems = [];
      state.wishListQuantity = 0;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      localStorage.setItem("wishListQuantity", state.wishListQuantity.toString());
    }
  },
});

export const { addToWishList, removeFromWishList,clearWishList } = wishlistSlice.actions;

export const selectWishListItems = (state) => state.wishlist.wishlistItems;
export const totalWishListQuantity = (state) => state.wishlist.wishListQuantity;
export  default wishlistSlice.reducer;
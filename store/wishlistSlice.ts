import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { saveWishlist } from "@/lib/wishlistStorage";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    initializeWishlist(
      state,
      action: PayloadAction<Product[]>
    ) {
      state.items = action.payload;
    },

    setWishlist(
      state,
      action: PayloadAction<Product[]>
    ) {
      state.items = action.payload;
      saveWishlist(state.items);
    },

    toggleWishlist(
      state,
      action: PayloadAction<Product>
    ) {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }

      saveWishlist(state.items);
    },

    clearWishlist(state) {
      state.items = [];
      saveWishlist([]);
    },
  },
});

export const {
  initializeWishlist,
  setWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
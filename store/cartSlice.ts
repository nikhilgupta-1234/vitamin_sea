import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { saveCart } from "@/lib/cartStorage";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Initialize cart from local storage
    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    // Replace entire cart (used for Supabase sync)
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCart(state.items);
    },

    // Add Product
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    // Remove Product
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveCart(state.items);
    },

    // Increase Quantity
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity++;
      }

      saveCart(state.items);
    },

    // Decrease Quantity
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== action.payload
        );
      }

      saveCart(state.items);
    },

    // Clear Cart
    clearCart(state) {
      state.items = [];
      saveCart([]);
    },
  },
});

export const {
  initializeCart,
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
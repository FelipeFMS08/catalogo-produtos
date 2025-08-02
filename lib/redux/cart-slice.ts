import type { Product } from "../../types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.id === productToAdd.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = (existingItem.price + productToAdd.price);
      } else {
        state.items.push({...productToAdd, quantity: 1});
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== productId);
        }
      }
    },
  }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
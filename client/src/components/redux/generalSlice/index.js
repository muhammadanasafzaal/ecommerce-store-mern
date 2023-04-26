import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTokenUpdated: false,
  isLoading: false,
  cartItems: [],
  allProducts: [],
  response: ""
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    tokenUpdate: (state, action) => {
      state.isTokenUpdated = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addProductToCart: (state, action) => {
      state.cartItems.push(action.payload)
      const items = []
      const data = JSON.parse(JSON.stringify(state.cartItems))
      console.log(data)
      let tamnt = 0
      let tquant= 0
      if(data.length>1){
        const indx = data.findIndex(item => item.totalAmount != null);
        data.splice(indx, 1)
      }
    
      data.forEach(x => {
        const obj = items.find(o => o.p_id === x.p_id);
        if (obj) {
            obj.total = obj.total + x.total;
            obj.quantity = obj.quantity + x.quantity;
        } else {
            x.total = x.price * x.quantity;
            items.push(x);
        }
        tamnt += x.total    
        tquant += x.quantity    
      });
      
      console.log(items)
      items.push({ totalAmount: tamnt, totalQuantity: tquant }) 
      
      state.cartItems = items
    },
    deleteProductFromCart: (state, action) => {
      console.log(action.payload)
      if(state.cartItems.length == 2){
        state.cartItems = []
      }
      else{
        state.cartItems.splice(action.payload, 1)
        console.log(state.cartItems)
      }
    },
    resetCart: (state, action) => {
      state.cartItems = []
    },
    allProducts: (state, action) => {
      state.allProducts = [...action.payload]
      console.log(action.payload, 'action payload')
      console.log(state.allProducts, 'products in store')
    },
    response: (state, action) => {
      state.response = action.payload
    },
  },
});

export const { tokenUpdate, isLoading, addProductToCart, deleteProductFromCart, resetCart, allProducts, response } = generalSlice.actions;

export default generalSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const propertySlice= createSlice({
  //Slice name:
  name: "property",
  //Initial state for the property slice.
  initialState: {
    properties: [],
    totalproperties: 0,
    searchParams: {}, //Parameters used to search.
    error: null,
    loading: false, //Loading state for the property.
  },

  //Reducers function to handle different functions
  reducers: {
    getRequest(state){
      state.loading = true;
    },
    getProperties(state,action){
      state.properties =action.payload.data;
      state.totalproperties = action.payload.all_properties;
      state.loading = false;
    },

    //Action to search parameters.
    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
                ...state.searchParams,
                ...action.payload,
            };
   },
    
    //Action to update error state.
    getErrors(state, action) {
      state.error = action.payload;
    },
  },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;
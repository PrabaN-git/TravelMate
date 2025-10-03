import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "http://localhost:5000/api/places";

// Thunks for CRUD
export const fetchPlaces = createAsyncThunk("places/fetchPlaces", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addPlace = createAsyncThunk("places/addPlace", async (place) => {
  const res = await axios.post(API_URL, place);
  return res.data;
});

export const deletePlace = createAsyncThunk("places/deletePlace", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updatePlace = createAsyncThunk("places/updatePlace", async (place) => {
  const res = await axios.put(`${API_URL}/${place._id}`, place);
  return res.data;
});

// Slice
const placeSlice = createSlice({
  name: "places",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => { state.loading = true; })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export default placeSlice.reducer;

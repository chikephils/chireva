import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
  events: [],
  loading: true,
  error: null,
};

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/event/get-all-events`);
      return response.data.events;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (
    {
      name,
      description,
      category,
      startDate,
      finishDate,
      originalPrice,
      discountPrice,
      stock,
      shopId,
      images,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${server}/event/create-event`, {
        name,
        description,
        category,
        startDate,
        finishDate,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      });
      return response.data.event;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
export const selectAllEvents = (state) => state.events.events;
export const selectEventLoading = (state) => state.events.loading;
export const selectEventError = (state) => state.events.error;

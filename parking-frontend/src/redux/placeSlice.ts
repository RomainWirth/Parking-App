import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Place {
  id: number;
  occupied: boolean;
}

interface PlaceState {
  loading: boolean;
  places: Place[];
}

const initialState: PlaceState = {
  loading: false,
  places: [],
};

export const fetchPlaces = createAsyncThunk('places/fetch', async () => {
  const response = await fetch('/api/parking');
  const data = await response.json();
  return data;
});

export const occupyPlace = createAsyncThunk(
  'places/occupy',
  async (placeId: number) => {
    await fetch(`/api/parking/${placeId}/occupy`, { method: 'PUT' });
    return placeId;
  }
);

export const vacatePlace = createAsyncThunk(
  'places/vacate',
  async (placeId: number) => {
    await fetch(`/api/parking/${placeId}/vacate`, { method: 'PUT' });
    return placeId;
  }
);

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state) => {
        state.loading = false;
      })
      .addCase(occupyPlace.fulfilled, (state, action) => {
        const placeId = action.payload;
        const place = state.places.find((place) => place.id === placeId);
        if (place) {
          place.occupied = true;
        }
      })
      .addCase(vacatePlace.fulfilled, (state, action) => {
        const placeId = action.payload;
        const place = state.places.find((place) => place.id === placeId);
        if (place) {
          place.occupied = false;
        }
      });
  },
});

export const selectPlaces = (state: RootState) => state.places.places;
export const selectLoading = (state: RootState) => state.places.loading;

export default placeSlice.reducer;
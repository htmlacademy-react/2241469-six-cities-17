import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, NameSpace } from '../../../data/const';
import { City } from '../../../data/types/offer';
import { CityProcess } from '../../../data/types/state';

const initialState: CityProcess = {
  city: Cities.AMSTERDAM
};
export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    }
  }
});
export const { changeCity } = cityProcess.actions;

import { createReducer } from '@reduxjs/toolkit';

import offers from '../mocks/offers.ts';
import { changeCity, changeSort, fillOffers, resetSort } from './action.ts';
import { Cities } from '../data/const.ts';
import { Sorts } from '../const.ts';
import { sort } from '../utils/sort.ts';

const initialState = {
  city: Cities.PARIS,
  offers: offers,
  sort: Sorts.PRICE_HIGH_TO_LOW
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
      state.offers = sort[action.payload]([...offers]);
    })
    .addCase(resetSort, (state) => {
      state.sort = Sorts.POPULAR;
    });

});

export { reducer };


import { createReducer } from '@reduxjs/toolkit';

import offers from '../mocks/offers.ts';
import { changeCity, fillOffers } from './action.ts';
import { Cities } from '../data/const.ts';

const initialState = {
  city: Cities.PARIS,
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };


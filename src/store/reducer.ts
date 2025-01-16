import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, loadOffers, resetSort, setOffersDataLoadingStatus } from './action.ts';
import { Cities } from '../data/const.ts';
import { Sorts } from '../const.ts';
import { sort } from '../utils/sort.ts';
import { AuthorizationStatus } from '../data/authorization.ts';
import { City, Offer } from '../data/types/offer.ts';


type InitialState = {
  city: City;
  offers: Offer[];
  sort: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
  sort: Sorts.PRICE_HIGH_TO_LOW,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
      state.offers = sort[action.payload]([...state.offers]);
    })
    .addCase(resetSort, (state) => {
      state.sort = Sorts.POPULAR;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });

});

export { reducer };


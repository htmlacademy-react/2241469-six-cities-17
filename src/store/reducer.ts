import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, loadOffers, loadUserData, requireAuthorization, resetSort, setError, setOffersDataLoadingStatus } from './action.ts';
import { Cities } from '../data/const.ts';
import { Sorts } from '../const.ts';
import { sort } from '../utils/sort.ts';
import { AuthorizationStatus } from '../data/authorization.ts';
import { City, Offer } from '../data/types/offer.ts';
import { UserData } from '../data/types/users.ts';


type InitialState = {
  city: City;
  offers: Offer[];
  sort: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  user: UserData | null;
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
  sort: Sorts.PRICE_HIGH_TO_LOW,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  user: null,
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
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.user = action.payload;
    });

});

export { reducer };


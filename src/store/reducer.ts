import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearestOffers, loadOffers, loadUserData, requireAuthorization, resetSort, setError, setOffersDataLoadingStatus } from './action.ts';
import { Cities } from '../data/const.ts';
import { Sorts } from '../const.ts';
import { sort } from '../utils/sort.ts';
import { AuthorizationStatus } from '../data/authorization.ts';
import { City, CurrentOffer, Offer, Review } from '../data/types/offer.ts';
import { UserData } from '../data/types/users.ts';


type InitialState = {
  city: City;
  offers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: CurrentOffer | null;
  nearestOffers: Offer[];
  sort: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  user: UserData | null;
  comments: Review[];
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearestOffers: [],
  sort: Sorts.PRICE_HIGH_TO_LOW,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  user: null,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearestOffers, (state, action) => {
      state.nearestOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
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


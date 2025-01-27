import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sorts } from '../../../const';
import { sort } from '../../../utils/sort';
import { fetchOffersAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearestOfferAction, updateOfferFavoriteStatusAction } from '../../api-actions';
import { OffersData } from '../../../data/types/state';
import { NameSpace } from '../../../data/const';


const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearestOffers: [],
  sort: Sorts.POPULAR,
  isOffersDataLoading: false
};
export const offerData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<string>) => {
      state.offers = sort[action.payload]([...state.offers]);
      state.sort = action.payload;
    },
    resetSort: (state) => {
      state.sort = Sorts.POPULAR;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearestOfferAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
      })
      .addCase(updateOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.favoriteOffers = action.payload.filter((offer) => offer.isFavorite === true);
      });
  }
});
export const { changeSort, resetSort } = offerData.actions;


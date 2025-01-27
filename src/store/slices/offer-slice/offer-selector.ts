import { NameSpace } from '../../../data/const';
import { State } from '../../../data/types/state';

export const getOffers = (state: State) =>
  state[NameSpace.Offers].offers;
export const getFavoriteOffers = (state: State) =>
  state[NameSpace.Offers].favoriteOffers;
export const getCurrentOffer = (state: State) =>
  state[NameSpace.Offers].currentOffer;
export const getNearestOffers = (state: State) =>
  state[NameSpace.Offers].nearestOffers;
export const getOffersDataLoadingStatus = (state: State) =>
  state[NameSpace.Offers].isOffersDataLoading;
export const getActiveSort = (state: State) =>
  state[NameSpace.Offers].sort;

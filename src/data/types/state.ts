
import { store } from '../../store';
import { AuthorizationStatus } from '../authorization';
import { City, CurrentOffer, Offer, Review } from './offer';
import { UserData } from './users';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export type OffersData = {
    offers: Offer[];
    favoriteOffers: Offer[];
    currentOffer: CurrentOffer | null;
    nearestOffers: Offer[];
    sort: string;
    isOffersDataLoading: boolean;
  };


export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    user: UserData | null;
  };

export type CommentsData = {
    comments: Review[];
  };

export type CityProcess = {
    city: City;
  };

export type ErrorsProcess = {
    error: string | null;
  };


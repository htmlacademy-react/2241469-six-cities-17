import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../data/types/offer';
import { AuthorizationStatus } from '../data/authorization';
import { PathRoutes } from '../data/routes';
import { UserData } from '../data/types/users';


export const changeCity = createAction('CHANGE_CITY', (selectedCity: City) => ({
  payload: selectedCity
}));

export const changeSort = createAction('CHANGE_SORT', (currentFilter: string) => ({
  payload: currentFilter
}));

export const resetSort = createAction('RESET_SORT');

export const loadOffers = createAction<Offer[]>('LOAD_OFFERS');

export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');

export const setOffersDataLoadingStatus = createAction<boolean>('SET_OFFERS_DATA_LOADING_STATUS');

export const setError = createAction<string | null>('SET_ERROR');

export const redirectToRoute = createAction<PathRoutes>('REDIRECT_TO_ROUTE');

export const loadUserData = createAction<UserData>('LOAD_USER_DATA');


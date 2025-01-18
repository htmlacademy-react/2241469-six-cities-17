import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../data/const';
import { loadOffers, loadUserData, redirectToRoute, requireAuthorization, setError, setOffersDataLoadingStatus } from './action';
import { AppDispatch, State } from '../data/types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../data/types/offer';
import { AuthorizationStatus } from '../data/authorization';
import { AuthData, UserData } from '../data/types/users';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { PathRoutes } from '../data/routes';


export const APIAction = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};


export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_OFFERS,
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));

      const { data } = await api.get<Offer[]>(APIRoute.Offers);

      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffers(data));
    }
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.CHECK_AUTH,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const { data } = await api.get<UserData>(APIRoute.Login);
        dispatch(loadUserData(data));

        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    }
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.LOGIN,
    async ({email, password}, {dispatch, extra: api}) => {
      const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
      dispatch(loadUserData(data));
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(PathRoutes.MAIN));
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.LOGOUT,
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  );

export const clearErrorAction = createAsyncThunk(
  APIAction.CLEAR_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);


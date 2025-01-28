import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../data/const';
import { redirectToRoute} from './action';
import { AppDispatch, State } from '../data/types/state';
import { AxiosInstance } from 'axios';
import { CurrentOffer, Offer, Review, ReviewToSend } from '../data/types/offer';
import { AuthData, UserData } from '../data/types/users';
import { dropToken, saveToken } from '../services/token';
import { PathRoutes } from '../data/routes';
import { setError } from './slices/errors-slice/errors-slice';


export const APIAction = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  FETCH_FAVORITE_OFFERS: 'FETCH_FAVORITE_OFFERS',
  FETCH_CURRENT_OFFER: 'FETCH_CURRENT_OFFER',
  FETCH_NEAREST_OFFERS: 'FETCH_NEAREST_OFFERS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  POST_COMMENT: 'POST_COMMENT',
  UPDATE_OFFER_FAVORITE_STATUS: 'UPDATE_OFFER_FAVORITE_STATUS'
};


export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_OFFERS,
    async (_arg, {extra: api}) => {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    }
  );

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_FAVORITE_OFFERS,
    async (_arg, {extra: api}) => {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      return data;
    }
  );

export const fetchCurrentOfferAction = createAsyncThunk<CurrentOffer, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_CURRENT_OFFER,
    async (id, {extra: api}) => {
      const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);
      return data;
    }
  );

export const fetchNearestOfferAction = createAsyncThunk<Offer[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_NEAREST_OFFERS,
    async (id, {extra: api}) => {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      return data;
    }
  );

export const fetchCommentsAction = createAsyncThunk<Review[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.FETCH_COMMENTS,
    async (id, {extra: api}) => {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      return data;
    }
  );


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.CHECK_AUTH,
    async (_arg, {extra: api}) => {
      const { data } = await api.get<UserData>(APIRoute.Login);
      return data;
    }
  );

export const postCommentAction = createAsyncThunk<void, ReviewToSend, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >(
    APIAction.POST_COMMENT,
    async ({comment, rating, id}, {extra: api}) => {
      await api.post<ReviewToSend>(`${APIRoute.Comments}/${id}`, {comment, rating});
    }
  );

export const updateOfferFavoriteStatusAction = createAsyncThunk<Offer[], {id: string; favoriteStatus: boolean}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.UPDATE_OFFER_FAVORITE_STATUS,
    async ({id, favoriteStatus}, {extra: api}) => {
      const status = favoriteStatus ? 0 : 1;
      await api.post<Offer[]>(`${APIRoute.Favorite}/${id}/${status}`);
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    }
  );

export const loginAction = createAsyncThunk<UserData, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.LOGIN,
    async ({email, password}, {dispatch, extra: api}) => {
      const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(redirectToRoute(PathRoutes.MAIN));
      return data;
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    APIAction.LOGOUT,
    async (_arg, {extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
    }
  );


export const clearErrorAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  APIAction.CLEAR_ERROR,
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
);

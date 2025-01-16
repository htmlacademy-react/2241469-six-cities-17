import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../data/const';
import { loadOffers, setOffersDataLoadingStatus } from './action';
import { AppDispatch, State } from '../data/types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../data/types/offer';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffers(data));
    }
  );

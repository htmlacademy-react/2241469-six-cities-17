import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../data/const';
import { offerData } from './slices/offer-slice/offer-slice';
import { userProcess } from './slices/user-slice/user-slice';
import { commentsData } from './slices/review-slice/review-slice';
import { cityProcess } from './slices/city-slice/city-slice';
import { errorsProcess } from './slices/errors-slice/errors-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offerData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.City]: cityProcess.reducer,
  [NameSpace.Errors]: errorsProcess.reducer
});



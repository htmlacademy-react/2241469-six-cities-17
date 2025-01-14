import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../data/types/offer';


export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS: 'FILL_OFFERS',
  CHANGE_SORT: 'CHANGE_SORT',
  RESET_SORT: 'RESET_SORT'
};

export const changeCity = createAction(Action.CHANGE_CITY, (selectedCity: City) => ({
  payload: selectedCity
}));

export const fillOffers = createAction(Action.FILL_OFFERS, (currentOffers: Offer[]) => ({
  payload: currentOffers
}));

export const changeSort = createAction(Action.CHANGE_SORT, (currentFilter: string) => ({
  payload: currentFilter
}));

export const resetSort = createAction(Action.RESET_SORT);

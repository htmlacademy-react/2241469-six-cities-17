import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../data/types/offer';


export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS: 'FILL_OFFERS'
};

export const changeCity = createAction(Action.CHANGE_CITY, (selectedCity: City) => ({
  payload: selectedCity
}));

export const fillOffers = createAction(Action.FILL_OFFERS, (currentOffers: Offer[]) => ({
  payload: currentOffers
}));

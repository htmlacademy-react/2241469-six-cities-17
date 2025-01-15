import { Sorts } from '../const';
import { Offer } from '../data/types/offer';


const priceLowSort = (offerA: Offer, offerB: Offer) =>
  offerA.price - offerB.price;
const priceHighSort = (offerA: Offer, offerB: Offer) =>
  offerB.price - offerA.price;
const topRatedSort = (offerA: Offer, OfferB: Offer) =>
  offerA.rating - OfferB.rating;

export const sort = {
  [Sorts.POPULAR]: (offers: Offer[]) => offers,
  [Sorts.PRICE_LOW_TO_HIGH]: (offers: Offer[]) => offers.sort(priceLowSort),
  [Sorts.PRICE_HIGH_TO_LOW]: (offers: Offer[]) => offers.sort(priceHighSort),
  [Sorts.TOP_RATED_FIRST]: (offers: Offer[]) => offers.sort(topRatedSort)
};


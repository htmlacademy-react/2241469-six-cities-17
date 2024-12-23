import { Offer } from '../data/types/offer';

const OfferList:Offer[] = [
  {
    id:'cc168b80-2988-4234-a48e-2dc2fa2823cb',
    title: 'The house among olive ',
    type: 'house',
    price: 115,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/17.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.2
  },
  {
    id:'805f426f-e11f-4961-b768-759d7e12f5e0',
    title: 'Waterfront with extraordinary view',
    type: 'apartment',
    price: 457,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/16.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3
  },
  {
    id:'3e4b53a3-1668-402c-88fb-c3c3b69c34eb',
    title: 'Amazing and Extremely Central Flat',
    type: 'apartment',
    price: 304,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 44.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.4
  },
  {
    id:'65cfabd3-c168-4af5-b2e9-314e39828347',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 515,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.6
  }
];

export default OfferList;

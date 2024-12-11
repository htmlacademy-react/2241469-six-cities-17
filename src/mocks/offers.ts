import { Offer } from '../data/types/offer';

const OfferList:Offer[] = [
  {
    id: '86ef72ae-69aa-4a99-8124-cbb2e460d6bc',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'house',
    price: 756,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.1
  },
  {
    id: 'e49b9283-4cdc-4437-bade-b249a29ad933',
    title: 'House in countryside',
    type: 'apartment',
    price: 456,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.6
  },
  {
    id: '2ad908a4-09e9-48b4-bb86-9428f748011d',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'room',
    price: 292,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.6
  },
  {
    id: '0049e82e-b682-4eb8-b45b-3cc01e96a37a',
    title: 'The Joshua Tree House',
    type: 'apartment',
    price: 467,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.6
  }
];

export default OfferList;

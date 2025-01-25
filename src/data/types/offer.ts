export type Offer= {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Location= {
  latitude: number;
  longitude: number;
  zoom: number;
}


export type Review = {
  id: string;
  date: string;
  user: UserReview;
  comment: string;
  rating: number;
};

export type ReviewToSend = {
  id: string;
  comment: string;
  rating: number;
};

export type UserReview = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};


export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CurrentOffer = Offer & {
  images: string[];
  description: string;
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
};

export type OfferClick = (offer: Offer) => void;
export type OfferHover = (offer: Offer | undefined) => void;

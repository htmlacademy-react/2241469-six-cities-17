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


export type Review= {
  id: string;
  date: string;
  user: UserReview;
  comment: string;
  rating: number;
};

export type UserReview = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

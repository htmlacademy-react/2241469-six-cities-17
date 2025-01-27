import { NameSpace } from '../../../data/const';
import { City } from '../../../data/types/offer';
import { State } from '../../../data/types/state';

export const getCurrentCity = (state: State): City =>
  state[NameSpace.City].city;

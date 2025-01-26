
import { NameSpace } from '../../../data/const';
import { Review } from '../../../data/types/offer';
import { State } from '../../../data/types/state';

export const getComments = (state: State): Review[] =>
  state[NameSpace.Comments].comments;

import { AuthorizationStatus } from '../../../data/authorization';
import { NameSpace } from '../../../data/const';
import { State } from '../../../data/types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State) =>
  state[NameSpace.User].user;

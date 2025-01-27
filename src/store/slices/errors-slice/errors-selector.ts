import { NameSpace } from '../../../data/const';
import { State } from '../../../data/types/state';


export const getErrorMessage = (state: State) =>
  state[NameSpace.Errors].error;

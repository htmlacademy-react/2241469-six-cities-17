import { store } from '../store';
import { setError } from '../store/action';
import { clearErrorAction } from '../store/api-actions';

export const processErrorHandle = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

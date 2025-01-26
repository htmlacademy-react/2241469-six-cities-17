import { store } from '../store';
import { clearErrorAction } from '../store/api-actions';
import { setError } from '../store/slices/errors-slice/errors-slice';

export const processErrorHandle = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../data/const';
import { ErrorsProcess } from '../../../data/types/state';

const initialState: ErrorsProcess = {
  error: null
};
export const errorsProcess = createSlice({
  name: NameSpace.Errors,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});
export const { setError } = errorsProcess.actions;

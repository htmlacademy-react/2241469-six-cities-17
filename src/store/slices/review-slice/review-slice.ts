import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../data/const';
import { fetchCommentsAction } from '../../api-actions';
import { CommentsData } from '../../../data/types/state';

const initialState: CommentsData = {
  comments: []
};
export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

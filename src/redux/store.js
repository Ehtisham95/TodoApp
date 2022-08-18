import {configureStore} from '@reduxjs/toolkit';
import {loginSlice} from './LoginSlice';
import {todoSlice} from './TodoSlice';

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    todoSlice: todoSlice.reducer,
  },
});

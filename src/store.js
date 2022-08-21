import {configureStore} from '@reduxjs/toolkit';
import {loginSlice} from '../screens/login/LoginSlice';
import {todoSlice} from '../screens/home/TodoSlice';

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    todoSlice: todoSlice.reducer,
  },
});

import {createSlice} from '@reduxjs/toolkit';
import {getUserData} from '../data/AuthRepo';

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {user: {}, loggedIn: false},
  reducers: {
    loggedIn(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    loggedOut(state) {
      state.user = {};
      state.loggedIn = false;
    },
  },
});

export const {loggedIn, loggedOut} = loginSlice.actions;
export default loginSlice.reducer;

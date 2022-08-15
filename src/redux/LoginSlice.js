import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'loginState',
  initialState: null,
  reducers: {
    userData(state, action) {
      console.log('user data');
      state = {
        ...state,
        user: action.payload,
      };
    },
    loggedIn(state) {
      console.log('login');
      state = {
        ...state,
        loggedIn: true,
        otpVerified: false,
      };
    },
    verified(state) {
      console.log('verified');
      state = {
        ...state,
        otpVerified: true,
      };
    },
    loggedOut(state) {
      console.log('loggedout');
      state = null;
    },
  },
});

export const {loggedIn, loggedOut, verified, userData} = loginSlice.actions;
export default loginSlice.reducer;

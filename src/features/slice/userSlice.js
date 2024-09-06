import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
 

const setAuthTokenInCookie = (token, user) => {
  Cookies.set('authToken', token, { expires: 30, secure: true, sameSite: 'strict' });
  Cookies.set('userData', JSON.stringify(user), { expires: 30, secure: true, sameSite: 'strict' });
};





const initialState = {
  phoneNumber: null,
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const sendOTP = createAsyncThunk(
  'user/sendOTP',
  async (phoneNumber) => {
    const response = await axios.post('https://api.manageyourteam.in/users/send_otp', {
      phone_number: phoneNumber,

    });
    return response.data;
  }
);




export const login = createAsyncThunk(
  'user/login',
  async (verificationOtp) => {
    const response = await axios.post('https://api.manageyourteam.in/users/login', {
      verificationOtp,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.phoneNumber = action.meta.arg;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; 
        state.token = action.payload.token; 
        setAuthTokenInCookie(state.token,state.user)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

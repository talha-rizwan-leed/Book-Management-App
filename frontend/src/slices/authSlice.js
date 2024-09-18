/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        },
    }

});

export const { setCredentials, logout, setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../Redux/Slices/AuthSlice';

export const store = configureStore({
    reducer: todoReducer
})
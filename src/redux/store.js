import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import user from './modules/user'

export const store = configureStore({
  reducer: {
    user
  },
})

export const useAppDispath = () => useDispatch();

export const useAppSelect = useSelector;

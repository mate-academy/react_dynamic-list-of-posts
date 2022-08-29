import { AppDispatch } from './../store/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as postActions from "../store/slices/postSlice/actions";
import * as userActions from '../store/slices/userSlice/actions'

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators({
    ...postActions,
    ...userActions
  }, dispatch);
};

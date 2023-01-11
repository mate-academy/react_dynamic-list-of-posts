/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Notification from 'models/Notification';
import { v4 as uuid } from 'uuid';

export interface State {
  notifications: Notification[];
}

const initialState:State = {
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    enqueueSnackbar: (
      state:State,
      action:PayloadAction<Omit<Notification, 'key'>>,
    ) => {
      state.notifications = [
        ...state.notifications,
        { key: uuid(), ...action.payload },
      ];
    },
    closeSnackbar: (
      state:State,
      action:PayloadAction<{ key:string, dismissAll:boolean }>,
    ) => {
      state.notifications = state.notifications
        .map((notification:Notification) => (
          (action.payload.dismissAll || notification.key === action.payload.key)
            ? { ...notification, dismissed: true }
            : notification
        ));
    },
    removeSnackbar: (state, action:PayloadAction<string>) => {
      state.notifications = state.notifications
        .filter((notification:Notification) => (
          notification.key !== action.payload
        ));
    },
  },
});

export const UiActions = uiSlice.actions;

export default uiSlice.reducer;

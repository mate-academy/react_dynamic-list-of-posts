import { RootState } from 'store';

export const selectNotifications = (state:RootState) => state.ui.notifications;

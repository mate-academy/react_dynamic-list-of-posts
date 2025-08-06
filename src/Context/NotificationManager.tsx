import React, { createContext, useReducer } from 'react';
import { ErrorActions, Notification } from '../types/Notification';
import { errorReducer, initialErrors } from '../Reducer/NotificationReducer';
// import { errorReducer, initialErrors } from '../Reducer/NotificationReducer';
// import { ErrorActions, Notification } from '../types/Notification';

type NotificationContextType = {
  notificationState: Notification;
  notificationDispatch: React.Dispatch<ErrorActions>;
};

export const NotificationContent = createContext<NotificationContextType>({
  notificationState: initialErrors,
  notificationDispatch: () => {},
});

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notificationState, notificationDispatch] = useReducer(
    errorReducer,
    initialErrors,
  );

  return (
    <NotificationContent.Provider
      value={{ notificationState, notificationDispatch }}
    >
      {children}
    </NotificationContent.Provider>
  );
};

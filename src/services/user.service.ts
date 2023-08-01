import React from 'react';
import { getAllUsers } from '../api/users.api';
import { Action, ActionTypes, NotificationTypes } from '../reducer/store';

export function userService(
  dispatch: (action: Action) => void,
) {
  function getUsers(
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    getAllUsers()
      .then(users => {
        if (!Array.isArray(users)) {
          throw Error();
        }

        dispatch(
          { type: ActionTypes.getAllUsers, users },
        );
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.setNotification,
          notificationType: NotificationTypes.danger,
          notificationMessage: 'Something went wrong!',
          notificationData: 'PostsLoadingError',
        });

        setShowNotification(true);
      });
  }

  return { getUsers };
}

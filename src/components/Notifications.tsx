import { FC, useEffect } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import INotification from 'models/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from 'store/ui/uiSlice';
import { selectNotifications } from 'store/ui/uiSelectors';
import { Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

let displayed:SnackbarKey[] = [];

const Notifications:FC = () => {
  const dispatch = useDispatch();

  const notifications:INotification[] | null = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const closeNotification = (key:SnackbarKey) => {
    dispatch(uiActions.closeSnackbar({ key, dismissAll: Boolean(key) }));
  };

  const removeNotification = (key:SnackbarKey) => {
    dispatch(uiActions.removeSnackbar(key));
  };

  const storeDisplayed = (key:SnackbarKey) => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = (key:SnackbarKey) => {
    displayed = displayed.filter((id:SnackbarKey) => id !== key);
  };

  useEffect(() => {
    if (notifications) {
      notifications.forEach(({
        key, message, options = {}, dismissed = false,
      }:INotification) => {
        if (dismissed) {
          closeSnackbar(key);

          return;
        }

        if (displayed.includes(key)) {
          return;
        }

        enqueueSnackbar(message, {
          key,
          ...options,
          action: (myKey:SnackbarKey) => (
            <Button
              style={{ color: '#fff' }}
              size="small"
              onClick={() => closeNotification(myKey)}
            >
              <CloseIcon />
            </Button>
          ),
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (_, myKey:SnackbarKey) => {
            removeNotification(myKey);
            removeDisplayed(myKey);
          },
        });
        storeDisplayed(key);
      });
    }
  }, [notifications]);

  return null;
};

export default Notifications;

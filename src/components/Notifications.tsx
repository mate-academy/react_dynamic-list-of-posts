import { FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import INotification from 'models/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from 'store/ui/uiSlice';
import { selectNotifications } from 'store/ui/uiSelectors';
import { Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

let displayed:string[] = [];

const Notifications:FC = () => {
  const dispatch = useDispatch();

  const notifications:INotification[] | null = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const closeNotification = (key:string) => {
    dispatch(UiActions.closeSnackbar({ key, dismissAll: Boolean(key) }));
  };

  const removeNotification = (key:string) => {
    dispatch(UiActions.removeSnackbar(key));
  };

  const storeDisplayed = (key:string) => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = (key:string) => {
    displayed = displayed.filter((id:string) => id !== key);
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

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) {
          return;
        }

        enqueueSnackbar(message, {
          key,
          ...options,
          action: (myKey:string) => (
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
          onExited: (_, myKey:string) => {
            removeNotification(myKey);
            removeDisplayed(myKey);
          },
        });
        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      });
    }
  }, [notifications]);

  return null;
};

export default Notifications;

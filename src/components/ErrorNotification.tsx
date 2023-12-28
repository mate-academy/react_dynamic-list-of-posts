import React from 'react';
import classNames from 'classnames';
import { ErrorType } from '../types/ErrorType';

interface Props {
  error: ErrorType,
  setError: React.Dispatch<React.SetStateAction<ErrorType>>,
  myStyles?: boolean,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
  myStyles = true,
}) => (
  <div
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      { 'my-notification': myStyles },
    )}
  >
    <button
      type="button"
      className="delete"
      aria-label="Close notification"
      onClick={() => setError(ErrorType.none)}
    />
    {error}
  </div>
);

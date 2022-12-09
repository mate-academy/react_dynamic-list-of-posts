import { FC } from 'react';
import { AddingError } from './Notifications/AddingError';
import { DeleteError } from './Notifications/DeleteError';
import { ErrorLoadingComments } from './Notifications/ErrorLoadingComments';
import { NoCommentsYet } from './Notifications/NoCommentsYet';

type Props = {
  isLoadingError: boolean,
  isDeleteError: boolean,
  isAddingError: boolean,
  isNoComments: boolean,
  isLoader: boolean,
};

export const HandleErrorsComponent: FC<Props> = ({
  isLoadingError,
  isDeleteError,
  isAddingError,
  isNoComments,
  isLoader,
}) => {
  return (
    <>
      {isLoadingError && (
        <ErrorLoadingComments />
      )}

      {isDeleteError && (
        <DeleteError />
      )}

      {isAddingError && (
        <AddingError />
      )}

      {isNoComments && !isLoader && (
        <NoCommentsYet />
      )}
    </>
  );
};

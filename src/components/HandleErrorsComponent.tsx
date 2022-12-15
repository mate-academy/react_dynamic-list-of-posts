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

type ErrorPairs = (boolean | JSX.Element)[][];

export const HandleErrorsComponent: FC<Props> = ({
  isLoadingError,
  isDeleteError,
  isAddingError,
  isNoComments,
  isLoader,
}) => {
  const isCommentsError = isNoComments && !isLoader;

  const errorPairs = [
    [isLoadingError, <ErrorLoadingComments key={1} />],
    [isDeleteError, <DeleteError key={2} />],
    [isAddingError, <AddingError key={3} />],
    [isCommentsError, <NoCommentsYet key={4} />],
  ];

  const renderErrors = (
    (arrayOfErrorPairs: ErrorPairs) => {
      return arrayOfErrorPairs.map(errorPair => errorPair[0] && errorPair[1]);
    });

  return (
    <>
      {renderErrors(errorPairs).map(errorElement => errorElement)}
    </>
  );
};

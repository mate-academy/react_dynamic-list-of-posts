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
  const isCommentsError = isNoComments && !isLoader;

  const errorPairs = [
    {
      condition: isLoadingError,
      errorComponent: <ErrorLoadingComments key={1} />,
    },
    {
      condition: isDeleteError,
      errorComponent: <DeleteError key={2} />,
    },
    {
      condition: isAddingError,
      errorComponent: <AddingError key={3} />,
    },
    {
      condition: isCommentsError,
      errorComponent: <NoCommentsYet key={4} />,
    },
  ];

  return (
    <>
      {errorPairs
        .map(errorPair => errorPair.condition && errorPair.errorComponent)}
    </>
  );
};

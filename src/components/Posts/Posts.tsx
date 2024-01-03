import { useContext } from 'react';
import { Messages } from '../../libs/enums';
import { StateContext } from '../../store';
import { PostsList } from './PostsList';

export const Posts: React.FC = () => {
  const {
    users: { selectedUser },
  } = useContext(StateContext);

  const isUserSelected = !!selectedUser;

  return (
    isUserSelected ? (
      <PostsList />
    ) : (
      <p data-cy="NoSelectedUser">
        {Messages.NoUserSelected}
      </p>
    )
  );
};

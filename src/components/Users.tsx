import { useContext } from 'react';
import { PostsContext } from '../services/Store';
import { UserItem } from './User';

export const Users: React.FC = () => {
  const { users } = useContext(PostsContext);

  return (
    <>
      {users.map(user => {
        return <UserItem key={user.id} user={user} />;
      })}
    </>
  );
};

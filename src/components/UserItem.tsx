import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { User } from '../types/User';
import cn from 'classnames';

interface UserItemProps {
  user: User;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { handleUserSelect, selectedUser, setSelectedPost } =
    useContext(PostsContext);

  return (
    <a
      href={`#user-${user.id}`}
      className={cn('dropdown-item', {
        'is-active': selectedUser?.id === user.id,
      })}
      onClick={e => {
        e.preventDefault();
        handleUserSelect(user);
        setSelectedPost(null);
      }}
    >
      {user.name}
    </a>
  );
};

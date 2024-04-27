import classNames from 'classnames';
import { User } from '../../../types/User';
import { useContext } from 'react';
import { postsContext } from '../../../Store';
type Props = {
  user: User;
  selectedUser: User | null;
  onSelect: (v: boolean) => void;
};

export const UserItem: React.FC<Props> = ({ user, selectedUser, onSelect }) => {
  const { setters } = useContext(postsContext);
  const { setSelectedUser } = setters;
  const handleClick = () => {
    setSelectedUser(user);
    onSelect(false);
  };

  return (
    <a
      key={user.id}
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': user.id === selectedUser?.id,
      })}
      onClick={handleClick}
    >
      {user.name}
    </a>
  );
};

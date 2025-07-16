import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UsersList: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => (
  <div className="dropdown-content">
    {users.map((user: User) => (
      <a
        onClick={() => onSelectUser(user)}
        href={`#user-${user.id}`}
        className={classNames('dropdown-item', {
          'is-active': user.id === selectedUser?.id,
        })}
        key={user.id}
      >
        {user.name}
      </a>
    ))}
  </div>
);

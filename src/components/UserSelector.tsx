import cn from 'classnames';
import { useState, FC, useEffect } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const UserSelector: FC<Props> = ({ setSelectedUser }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUserState] = useState<User>();
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();

        setUserList(users);
      } catch {}
    };

    fetchUsers();
  }, []);

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdownOpen(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownOpen })}
      onBlur={handleDropdownBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {userList?.map(user => (
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => {
                setSelectedUserState(user);
                setDropdownOpen(false);
                setSelectedUser(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

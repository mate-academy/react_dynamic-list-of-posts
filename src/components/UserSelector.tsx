import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { loadUsers } from '../api/Api';
import { Context } from './Context/Context';

type Props = {
  isSelectedUser: { current: boolean };
  getPosts: (id: number) => void;
  setIsShownSideBar: (value: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  isSelectedUser,
  getPosts,
  setIsShownSideBar,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isShownUsers, setIsShownUsers] = useState(false);

  useEffect(() => {
    loadUsers()
      .then((data) => setUsers(data));
  }, []);

  const { setPostId } = useContext(Context);

  const handleClick = (id: number, user: User) => {
    if (selectedUser === user.name) {
      return;
    }

    setPostId(id);
    setSelectedUser(user.name);
    getPosts(id);
    setIsShownSideBar(false);
    // eslint-disable-next-line no-param-reassign
    isSelectedUser.current = false;
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsShownUsers(!isShownUsers)}
          onBlur={() => setTimeout(() => {
            setIsShownUsers(false);
          }, 100)}
        >
          <span>
            {!selectedUser ? 'No user selected' : selectedUser}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isShownUsers && (
          <div className="dropdown-content">
            {users.map((user) => {
              const { id, name } = user;

              return (
                <a
                  href={`#user-${id}`}
                  key={id}
                  className={cn('dropdown-item', {
                    'is-active': name === selectedUser,
                  })}
                  onClick={() => handleClick(id, user)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

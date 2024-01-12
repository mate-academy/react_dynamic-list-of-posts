import React, { useState } from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem';

type Props = {
  users: User[],
  chooseUser: (value: number) => void,
  setChoosePost: (value: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  chooseUser,
  setChoosePost,
}) => {
  const [isUsers, setIsUsers] = useState(false);
  const [userName, setUserName] = useState('Choose a user');

  const choose = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: number,
    name: string,
  ) => {
    e.preventDefault();
    chooseUser(id);
    setUserName(name);
    setChoosePost(false);
    setIsUsers(!isUsers);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUsers(!isUsers)}
        >
          <span>
            {userName}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        {isUsers && (
          <div className="dropdown-content">
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                choose={choose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

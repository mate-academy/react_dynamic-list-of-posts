import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  userSelected: User | null;
  setUserSelected: (user: User) => void;
  setShowUsers: (show: boolean) => void;
};

export const DropDownMenu: React.FC<Props> = ({
  users,
  userSelected,
  setUserSelected,
  setShowUsers,
}) => {
  return (
    <div className="dropdown-menu is-active" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {users.map((user, index) => {
          return (
            <a
              href={`#user-${index}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.name === userSelected?.name,
              })}
              onClick={() => {
                setUserSelected(user);
                setShowUsers(false);
              }}
            >
              {user.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

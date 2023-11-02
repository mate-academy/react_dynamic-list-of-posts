import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  selectedUser: User | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser = () => {},
  setSelectedPost = () => {},
}) => {
  const [isActiveDropDown, setIsActiveDropDown] = useState<boolean>(false);

  const changeDropDownState = () => {
    setIsActiveDropDown(!isActiveDropDown);
  };

  const closeDropDown = () => {
    setIsActiveDropDown(false);
  };

  const chooseUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(undefined);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActiveDropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={changeDropDownState}
          onBlur={closeDropDown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className="dropdown-item"
                onClick={() => chooseUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

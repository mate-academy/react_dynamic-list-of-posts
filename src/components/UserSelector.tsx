import cn from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  selectedUserId: number | null,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  setSelectedUserId,
  setSelectedPost,
}) => {
  const [dropDownActive, setDropDownActive] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedUserId(id);
    setDropDownActive(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn({
        dropdown: true,
        'is-active': dropDownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropDownActive(!dropDownActive)}
        >
          <span>
            {
              selectedUserId
                ? users.find(user => user.id === selectedUserId)?.name
                : 'Choose a user'
            }
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
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn({
                'dropdown-item': true,
                'is-active': selectedUserId === user.id,
              })}
              onClick={() => handleSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

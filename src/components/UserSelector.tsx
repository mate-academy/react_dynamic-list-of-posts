import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';
type Props = {
  users: User[];
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  userId,
  setUserId,
  setSelectedPost,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState('');

  function OnChoose(user: User) {
    setIsPressed(false);
    setUserId(user.id);
    setName(user.name);
    setSelectedPost(undefined);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isPressed,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsPressed(!isPressed)}
          onBlur={() => handleBlur()}
        >
          <span>{name ? name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div
          className={classNames('dropdown-content', {
            'is-active': isPressed,
          })}
        >
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': userId === user.id,
              })}
              key={user.id}
              onClick={() => OnChoose(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

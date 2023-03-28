/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import className from 'classnames';
import { Post, User } from '../types';

type Props = {
  users: User[] | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const UserSelector: React.FC<Props> = ({ users, setSelectedPost }) => {
  const { userId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const onSelectUser = (name: string) => {
    setIsVisible(false);
    setSelectedName(name);
    setSelectedPost(null);
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
          onClick={toggleVisibility}
        >
          <span>{selectedName ? selectedName : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isVisible && (
          <div className="dropdown-content">
            {users?.map(user => {
              const { id, name } = user;
              const isSelectedUser = `user-${id}` === userId;

              return (
                <Link
                  key={id}
                  to={`/user-${id}`}
                  className={className(
                    'dropdown-item',
                    { 'is-active': isSelectedUser },
                  )}
                  onClick={() => onSelectUser(name)}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

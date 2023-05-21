import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  currentUser: User | null;
  onUserSelect(user: User): void,
  getUserPosts(user: User): void;
  hideCommemts(): void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  currentUser,
  onUserSelect,
  getUserPosts,
  hideCommemts,
}) => {
  const [isButtonTriggered, setIsButtonTriggered] = useState(false);

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
          onClick={() => setIsButtonTriggered(!isButtonTriggered)}
        >
          <span>{!currentUser ? 'Choose a user' : currentUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isButtonTriggered && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': currentUser === user },
                )}
                onClick={() => {
                  onUserSelect(user);
                  setIsButtonTriggered(false);
                  getUserPosts(user);
                  hideCommemts();
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

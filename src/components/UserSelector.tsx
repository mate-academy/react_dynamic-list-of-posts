import { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { UserItem } from './UserItem';

type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <UserItem
              user={user}
              onActiveToggle={setIsActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

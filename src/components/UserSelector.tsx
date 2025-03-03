import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';

interface Props {
  usersList: User[];
  setUser: (user: User) => void;
  user: User | null;
}

export const UserSelector: React.FC<Props> = ({ usersList, setUser, user }) => {
  const [dropdownIsActive, setDropdowmIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdownIsActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setDropdowmIsActive(prev => !prev);
          }}
          onBlur={() => setDropdowmIsActive(prev => !prev)}
        >
          {!user ? <span>Choose a user</span> : <span>{user.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(us => (
            <a
              key={us.id}
              href={`#user-${us.id}`}
              className={classNames('dropdown-item', {
                'is-active': user === us,
              })}
              onMouseDown={() => setUser(us)}
            >
              {us.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

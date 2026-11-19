import cn from 'classnames';

import { useState } from 'react';
import type { User } from '../types/User';

type Props = {
  users: User[] | null;
  selected: number | null;
  selectUser: (user: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selected,
  selectUser,
}) => {
  const [userList, setUserList] = useState<boolean>(false);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUserList(prev => !prev)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {userList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {users?.map(user => (
            <li key={user.id}>
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selected === user.id,
                })}
                onClick={() => selectUser(user.id)}
              >
                {user.name}
              </a>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

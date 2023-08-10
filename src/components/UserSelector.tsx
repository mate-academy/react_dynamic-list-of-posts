import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[]
  getPosts: (userId: number) => void
};

export const UserSelector: React.FC<Props> = ({
  users,
  getPosts,
}) => {
  const [activeMenu, setActieMenu] = useState(false);
  const [selectName, setSelectName] = useState<string>('');
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleUserClick = (user: User) => {
    setActieMenu(!activeMenu);
    setSelectName(user.name);
    setIsActive(user.id);
    getPosts(user.id);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': activeMenu })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActieMenu(!activeMenu)}
        >
          <span>
            {selectName || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {activeMenu && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({
              id, name, email, phone,
            }) => (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': isActive === id,
                })}
                onClick={() => handleUserClick({
                  id, name, email, phone,
                })}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

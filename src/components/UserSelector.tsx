import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedId?: number | null;
  onSelectId: (id: number) => void;
};

export const UserSelector: React.FC<Props> = memo(function UserSelector({
  users,
  selectedId,
  onSelectId,
}) {
  const [isMenuShowed, setIsMenuShowed] = useState(false);

  const dropDownRef = useOutsideClick(() => setIsMenuShowed(false));

  const selectedUser = users.find(({ id }) => id === selectedId);

  return (
    <div
      ref={dropDownRef}
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuShowed(!isMenuShowed)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isMenuShowed && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({ id, name }) => (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': id === selectedId,
                })}
                onClick={() => {
                  onSelectId(id);
                  setIsMenuShowed(false);
                }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

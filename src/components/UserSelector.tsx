import React, { useCallback, useState } from 'react';

import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  usersList: User[] | null,
  setUser: (id: number) => void,
};

export const UserSelector: React.FC<Props>
= React.memo(({ usersList, setUser }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleActiveId = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  const handleOpenState = useCallback(() => {
    setIsOpen(currVal => !currVal);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenState}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        onBlur={() => setIsOpen(false)}
      >
        <div className="dropdown-content">
          {usersList?.map(user => {
            const { id, name } = user;

            return (
              <a
                href={`#user-${id}`}
                key={id}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': id === activeId },
                )}
                onClick={() => {
                  handleActiveId(id);
                  setUser(id);
                  setIsOpen(false);
                }}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
});

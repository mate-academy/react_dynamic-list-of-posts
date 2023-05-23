import React, { useCallback, useState } from 'react';

import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  usersList: User[] | null,
  setUser: (id: number) => void,
  setActivePost: (param: null | number) => void
};

export const UserSelector: React.FC<Props>
= React.memo(({ usersList, setUser, setActivePost }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState('Choose a user');

  const handleBlur = useCallback((
    event: React.FocusEvent<HTMLButtonElement>,
  ) => {
    const { relatedTarget } = event;

    if (!relatedTarget || !relatedTarget.classList.contains('dropdown-item')) {
      setIsOpen(false);
    }
  }, []);

  const handleActiveId = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  const handleOpenState = useCallback(() => {
    setIsOpen(currVal => !currVal);
  }, []);

  const handleChoosenUsere = (name: string, id: number) => {
    setActivePost(null);
    setUserName(name);
    handleActiveId(id);
    setUser(id);
    setIsOpen(false);
  };

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
          onBlur={handleBlur}
        >
          <span>{userName}</span>

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
                onClick={() => handleChoosenUsere(name, id)}
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

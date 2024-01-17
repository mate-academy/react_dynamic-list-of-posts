import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  setUser: (user: User) => void;
  choosedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  setUser,
  users,
  choosedUser,
}) => {
  const [isSelectorOpen, setIsSelectorOpened] = useState(false);

  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isSelectorOpen
        && selectorRef.current
        && !selectorRef.current.contains(e.target as Node)
      ) {
        setIsSelectorOpened(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isSelectorOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isSelectorOpen })}
      ref={selectorRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsSelectorOpened(!isSelectorOpen);
          }}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': choosedUser?.id === user.id,
              })}
              onClick={() => {
                setUser(user);
                setIsSelectorOpened(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

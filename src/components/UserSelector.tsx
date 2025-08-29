import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  userSelector: number | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
  onUserSelect: React.Dispatch<React.SetStateAction<number | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  userSelector,
  setSelectedPostId,
  onUserSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUser = users.find(user => user.id === userSelector);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDropdown);

    return () => {
      document.removeEventListener('mousedown', handleDropdown);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={classNames('dropdown-menu', {
          'is-hidden': !isOpen,
        })}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === userSelector,
              })}
              key={user.id}
              onClick={() => {
                onUserSelect(user.id);
                setSelectedPostId(null);
                setIsOpen(false);
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

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selected: User | null;
  getUsersPosts: (userId: number) => void;
  onSelect: React.Dispatch<React.SetStateAction<User | null>>;
  setIsCommentsListHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selected,
  onSelect,
  getUsersPosts,
  setIsCommentsListHidden,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef(null);

  const handleSelectUser = (user: User) => {
    onSelect(user);
    setIsVisible(false);
    getUsersPosts(user.id);
    setIsCommentsListHidden(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target !== selectRef.current && isVisible) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={selectRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsVisible(true)}
        >
          <span>
            {selected
              ? selected.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={classNames('dropdown-item', {
                    'is-active': user.id === selected?.id,
                  })}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

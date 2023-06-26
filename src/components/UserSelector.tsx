import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  select: User | null;
  onSelect: React.Dispatch<React.SetStateAction<User | null>>
  getUserPosts: (userId: number) => void;
  setIsCommentListHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  select,
  onSelect,
  getUserPosts,
  setIsCommentListHidden,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef(null);

  const handleSelectUser = (user: User) => {
    onSelect(user);
    setIsVisible(false);
    getUserPosts(user.id);
    setIsCommentListHidden(true);
  };

  const handleClick = (ev: MouseEvent) => {
    if (ev.target !== selectRef.current && isVisible) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
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
            {select
              ? select.name
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
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': user.id === select?.id },
                )}
                key={user.id}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

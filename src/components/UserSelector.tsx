import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[] | null;
  currUser: User | null;
  handleUserSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users, currUser, handleUserSelect,
}) => {
  const [isListShown, setListShown] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const toggleList = () => {
    setListShown(!isListShown);
  };

  const handleUserClick = (user: User) => () => {
    handleUserSelect(user);
    toggleList();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: any) => {
      if (isListShown && ulRef.current
        && !ulRef.current.contains(e.currentTarget)) {
        setListShown(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isListShown]);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleList}
        >
          {!currUser && <span>Choose a user</span>}
          {!!currUser && <span>{currUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isListShown && (
        <ul
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          ref={ulRef}
        >
          {users?.map(user => (
            <li key={user.id} className="dropdown-content">
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': currUser?.id === user.id },
                )}
                onClick={handleUserClick(user)}
              >
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

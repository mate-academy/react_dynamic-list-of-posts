import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
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

  const handleClick = useCallback(({ target }: MouseEvent) => {
    const node = ulRef?.current;

    if (node && target instanceof Node && !node.contains(target)) {
      setListShown(false);
    }
  }, [isListShown, ulRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

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

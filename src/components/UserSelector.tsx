import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  selectUser: (user: User | null) => void,
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  selectedUser,
  selectUser,
}) => {
  const [listIsOpen, setListIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dropdownMenuStyle = {
    display: listIsOpen ? 'block' : 'none',
  };

  const handleSelectUser = (userId: number) => {
    const foundUser = users.find(user => user.id === userId) || null;

    selectUser(foundUser);
    setListIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropdownRef.current
        && !dropdownRef.current.contains(event.target as ChildNode)
      ) {
        setListIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is - active': listIsOpen },
      )}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setListIsOpen(!listIsOpen)}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={dropdownMenuStyle}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser?.id === user.id },
              )}
              onClick={() => handleSelectUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

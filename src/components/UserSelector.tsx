import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  isDropdownActive: boolean;
  setIsDropdownActive: Dispatch<SetStateAction<boolean>>;
  setActiveUserId: Dispatch<SetStateAction<number | null>>;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  activeUserId: number | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  isDropdownActive,
  setIsDropdownActive,
  setActiveUserId,
  setIsSidebarOpen,
  activeUserId,
}) => {
  const [activeUser, setActiveUser] = useState('Choose a user');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setIsDropdownActive]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>{activeUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': activeUserId === user.id,
              })}
              key={user.id}
              onClick={() => {
                setActiveUserId(user.id);
                setActiveUser(user.name);
                setIsDropdownActive(false);
                setIsSidebarOpen(false);
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

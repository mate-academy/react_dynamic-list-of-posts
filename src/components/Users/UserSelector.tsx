import {
  FC, useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames';
import { useUsersContext } from '../../hooks/useUsersContext';
import { Loader } from '../Loader';
import { UsersList } from './UsersList';

export const UserSelector: FC = () => {
  const { isUsersLoading, selectedUser } = useUsersContext();

  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownIsActive(prevState => !prevState);
  };

  const closeDropdown = () => setDropdownIsActive(false);

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    const dropdown = dropdownRef.current;

    if (dropdown && !dropdown.contains(event.target as Node)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdownIsActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isUsersLoading ? (
            <Loader />
          ) : (
            <UsersList onCloseDropdown={closeDropdown} />
          )}
        </div>
      </div>
    </div>
  );
};

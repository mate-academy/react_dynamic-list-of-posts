import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '../types/User';


type Props = {
  users: User[];
  handleChooseUser: (userId: number, userName: string) => void;
  selectedUser?: string | null;
}

const UserSelector: React.FC<Props> = React.memo(({ users, selectedUser, handleChooseUser }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleClickOutsideButton = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  }, []);


  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutsideButton);
    } else {
      document.removeEventListener('click', handleClickOutsideButton);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideButton);
    };
  }, [isDropdownOpen, handleClickOutsideButton]);




  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isDropdownOpen ? "is-active" : ""}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{selectedUser ? selectedUser : "Choose a user"}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(({id, name}) =>
            <a
              href={`#user-${id}`}
              className={`dropdown-item ${selectedUser === name ? "is-active" : ""}`}
              key={id}
              onClick={() => { handleChooseUser(id, name); setIsDropdownOpen(false) }}>
              {name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
});


UserSelector.displayName = 'UserSelector';
export default UserSelector;

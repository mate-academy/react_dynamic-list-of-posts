import React, { useState, useRef, useEffect } from 'react';

export const UserSelector: React.FC<{
  users: { id: number; name: string }[];
  onUserSelect: (user: { id: number; name: string }) => void; // Добавьте эту строку
}> = ({ users, onUserSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [choosen, setChoosen] = useState('Choose a user');

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleUserClick = (userId: number, userName: string) => {
    setActiveUserId(userId);
    setChoosen(userName);
    onUserSelect({ id: userId, name: userName }); // Вызов функции при выборе пользователя
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(prevState => !prevState);
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isDropdownVisible ? 'is-active' : ''}`}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          ref={buttonRef}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{choosen}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div
          className="dropdown-content"
          style={{ display: isDropdownVisible ? 'block' : 'none' }}
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#${user.id}`}
              className={`dropdown-item ${activeUserId === user.id ? 'is-active' : ''}`}
              onClick={() => handleUserClick(user.id, user.name)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

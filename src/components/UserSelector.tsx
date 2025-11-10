import React, { useState, useRef, useEffect } from 'react';

type UserSelectorProps = {
  users: Array<{ id: number; name: string }>;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUserId: number | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  setSelectedUserId,
  selectedUserId,
  setSelectedPostId,
}) => {
  const [selectButton, setSelectButton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSelectButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${selectButton ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setSelectButton(!selectButton)}
          data-cy="UserSelectorButton"
        >
          <span>
            {selectedUserId
              ? users.find(user => user.id === selectedUserId)?.name
              : 'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={`dropdown-item ${
                selectedUserId === user.id ? 'is-active' : ''
              }`}
              onClick={() => {
                setSelectedUserId(user.id);
                setSelectButton(false);
                setSelectedPostId(null);
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

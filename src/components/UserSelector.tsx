import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type PropsTypes = {
  users: User[];
  setSelectedUser: (user: User) => void;
  selectedUser: User | null,
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<PropsTypes> = ({
  users,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current
        && !menuRef.current.contains(event.target as HTMLElement)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={menuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setOpen(status => !status);
          }}
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {open && (
          <div
            className="dropdown-content"
          >
            {users.map((user) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  setSelectedUser(user);
                  setSelectedPost(null);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

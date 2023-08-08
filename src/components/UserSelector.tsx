import React, { useState } from 'react';
import { useUsers } from '../context/UsersContext';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null;
  selectUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({ selectedUser, selectUser }) => {
  const [open, setOpen] = useState(false);
  const users = useUsers();

  const handleOpen = () => {
    setOpen(!open);
  };

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
          onClick={handleOpen}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">

        <div className="dropdown-content">
          {open ? (
            users.map(user => {
              const { id, name } = user;

              return (
                <a
                  href={`#user-${id}`}
                  className="dropdown-item"
                  key={id}
                  onClick={() => {
                    selectUser(user);
                    handleOpen();
                  }}
                >
                  {name}
                </a>
              );
            })
          ) : (null)}
        </div>

      </div>
    </div>
  );
};

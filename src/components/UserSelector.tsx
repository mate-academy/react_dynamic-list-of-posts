import React, { useState } from 'react';
import { User } from '../types/User';
import { SelectUser } from './SelectUser';

type Props = {
  selectedUser: User | null;
  selectUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({ selectedUser, selectUser }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (user: User) => {
    selectUser(user);
    handleOpen();
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
            <SelectUser handleClick={handleClick} />
          ) : (null)}
        </div>

      </div>
    </div>
  );
};

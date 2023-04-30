import React, { useState } from 'react';
import { User } from '../types/User';
import { UserLink } from './UserLink';

type Props = {
  users: User[];
  selectedUser: User | null;
  getSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  getSelectedUser,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);

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
          onClick={handleMenuToggle}
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
        {isMenuOpen && (
          <div className="dropdown-content">
            {users.map(user => (
              <UserLink
                key={user.id}
                user={user}
                selectedUser={selectedUser}
                getSelectedUser={getSelectedUser}
                setIsMenuOpen={setIsMenuOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

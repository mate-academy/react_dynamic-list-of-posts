import { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

import cn from 'classnames';

interface UserSelectorProps {
  users: User[];
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDropDownOpen(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': dropDownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropDownOpen(prev => !prev)}
          onBlur={() => setDropDownOpen(false)}
        >
          <span>{selectedUser ? `${selectedUser.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {users.map(user => (
          <div key={user.id} className="dropdown-content">
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

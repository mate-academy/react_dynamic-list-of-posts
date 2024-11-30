import { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelectUser: Dispatch<SetStateAction<User | null>>;
}

export const UserSelector: FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleToggleMenu = () => {
    setIsDropdownOpened(prevState => !prevState);
  };

  const handleClickOutside = () => {
    setIsDropdownOpened(false);
  };

  const handleChooseUser = (user: User) => {
    onSelectUser(user);
    setIsDropdownOpened(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownOpened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleMenu}
          onBlur={handleClickOutside}
        >
          <span>
            {selectedUser?.name ? selectedUser.name : 'Choose a user'}
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
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleChooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

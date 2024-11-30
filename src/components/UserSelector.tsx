import { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[];
  userSelected: User | null;
  setUserSelected: Dispatch<SetStateAction<User | null>>;
  getUsersPost: (userId: User['id']) => void;
}

export const UserSelector: FC<Props> = ({
  users,
  userSelected,
  setUserSelected,
  getUsersPost,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSelectUser = (user: User) => {
    setUserSelected(user);
    setIsClicked(false);
    getUsersPost(user.id);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsClicked(current => !current)}
        >
          <span>{userSelected ? userSelected.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isClicked && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              const { id, name } = user;

              return (
                <a
                  key={id}
                  href={`#user-${id}`}
                  className={cn('dropdown-item', {
                    'is-active': userSelected?.id === id,
                  })}
                  onMouseDown={() => handleSelectUser(user)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

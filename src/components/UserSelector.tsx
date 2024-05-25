import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  userSelected: User | null;
  setUserSelected: Dispatch<SetStateAction<User | null>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  userSelected,
  setUserSelected,
  setShowForm,
  setSelectedPost,
}) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false);
  const handleSelectUser = (user: User) => {
    setUserSelected(user);
    setVisibleDropDown(false);
    setShowForm(false);
    setSelectedPost(null);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setVisibleDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onFocus={() => setVisibleDropDown(true)}
        >
          {userSelected ? (
            <span>{userSelected.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {visibleDropDown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === userSelected?.id,
                })}
                key={user.id}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { apiActions } from '../utils/apiAction';
import { ErrorNotification } from '../types/ErrorNotification';
import { Post } from '../types/Post';

type Props = {
  userSelected: User | null,
  setUserSelected: (user: User) => void;
  setErrorNotification: (error: (prevError: ErrorNotification)
  => ErrorNotification) => void;
  setSelectedPost?: (posts: Post) => void;
};

export const UserSelector: React.FC<Props> = ({
  userSelected,
  setUserSelected,
  setErrorNotification,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);

  const handleClickSelect = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    apiActions.getAllUsers()
      .then(setUsers)
      .catch(() => {
        setErrorNotification((error) => ({ ...error, users: true }));
      });
  }, [setErrorNotification]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isSelected })}
      role="button"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsSelected(false);
        }
      }}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          tabIndex={0}
          onClick={handleClickSelect}
        >
          <span>{userSelected ? `${userSelected.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelected && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users?.map((user) => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active':
                      (userSelected
                        && userSelected.id === user.id),
                  },
                )}
                onClick={() => {
                  setUserSelected(user);
                  setIsSelected(false);
                }}
                key={user.id}
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

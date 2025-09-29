import { FC, useEffect, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { getUsers } from './services/users';

type Props = {
  activeUser: User | null;
  setActiveUser: (user: User) => void;
  setErrorMessage: (message: string) => string | void;
};

export const UserSelector: FC<Props> = ({
  activeUser,
  setActiveUser = () => {},
  setErrorMessage = () => {},
}) => {
  const [openDrodown, setOpenDrodown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleActiveUser = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    event.preventDefault();
    setActiveUser(user);
    setOpenDrodown(false);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Failed to load users. Please try again.');
      })
      .finally(() => {});
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openDrodown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setOpenDrodown(prev => !prev);
          }}
        >
          <span>{activeUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                onClick={event => handleActiveUser(event, user)}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': id === activeUser?.id,
                })}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import {
  FC,
  useState,
  useEffect,
  useContext,
} from 'react';
import * as usersService from '../api/users';
import { User } from '../types/User';
import { UsersContext } from './UsersContext';

export const UserSelector: FC = () => {
  const { user, setUser } = useContext(UsersContext);
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    usersService.getAll()
      .then((res => setUsers(res)));
  }, [setUsers]);

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
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(usr => (
              <a
                key={usr.id}
                href={`#${usr.id}`}
                className="dropdown-item"
                onClick={() => {
                  setUser(usr);
                  setIsOpen(false);
                }}
              >
                {usr.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

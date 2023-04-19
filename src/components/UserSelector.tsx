import {
  FC,
  useEffect,
  useState,
  SetStateAction,
} from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Error } from '../types/Error';
import { client } from '../utils/fetchClient';

type Props = {
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  setError: (err: Error) => void,
  setIsLoader: (arg: boolean) => void,
};

export const UserSelector: FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setError,
  setIsLoader,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    client.get<SetStateAction<User[]>>('/users')
      .then((result) => setUsers(result))
      .catch(() => setError(Error.Load));
  }, []);

  const handleDropdown = () => {
    setIsDropdown(prev => !prev);
  };

  const onClickUser = (user: User) => {
    setIsLoader(true);
    handleDropdown();
    setSelectedUser(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': isDropdown },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>
            {!selectedUser ? 'Choose a user' : selectedUser.name}
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
              onClick={() => onClickUser(user)} // без () => якась фігня--------------????
              href={`#user-${user.id}`}
              className="dropdown-item"
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

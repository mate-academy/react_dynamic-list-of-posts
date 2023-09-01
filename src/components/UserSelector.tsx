import { useEffect, useState } from 'react';
import { UserInt } from '../types/UserInt';
import { getUser } from '../utils/RESTmethods';
import { User } from './User';

type UserSelectorProps = {
  selectedUser: UserInt | undefined,
  setSelectedUser: (newUser: UserInt) => void,
  setIsError: (isError: boolean) => void,
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUser,
  setSelectedUser,
  setIsError,
}) => {
  const [users, setUsers] = useState<UserInt[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    getUser()
      .then(setUsers)
      .catch(() => {
        setIsError(true);
      });
  }, []);

  const handleDropdownAppear = () => setIsDropdownVisible(!isDropdownVisible);
  const handleSelectUser = (newUser: UserInt) => {
    setSelectedUser(newUser);
    handleDropdownAppear();
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
          onClick={() => handleDropdownAppear()}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownVisible && users.length > 0 && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <User
                key={user.id}
                user={user}
                selectedUser={selectedUser}
                handleSelectUser={handleSelectUser}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

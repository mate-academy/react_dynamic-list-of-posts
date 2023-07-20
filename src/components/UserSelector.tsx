import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useUsers } from '../types/useUsers';
import { DropdownTrigger } from '../common/DropdownTrigger';
import { UserListItem } from '../common/UserListItem';

type Props = {
  handleSelectUser: (id: number) => void;
  selectedUserId: number;
};

export const UserSelector: React.FC<Props> = ({
  handleSelectUser,
  selectedUserId,
}) => {
  const { users, isError } = useUsers();
  const [showUsers, setShowUsers] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current
      && !wrapperRef.current.contains(event.target as Node)) {
      setShowUsers(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLoadUsers = () => {
    setShowUsers(prev => !prev);
  };

  const handleChangeUser = (newUserId: number) => {
    setShowUsers(false);
    handleSelectUser(newUserId);
  };

  const selectedUserName = users.find(user => user.id === selectedUserId)?.name;

  if (isError) {
    return (
      <div className="notification is-danger">
        Something went wrong!
      </div>
    );
  }

  return (
    <div
      data-cy="UserSelector"
      ref={wrapperRef}
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >
      <DropdownTrigger
        onClick={handleLoadUsers}
        selectedUserName={selectedUserName}
      />

      {showUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <UserListItem
                key={user.id}
                user={user}
                selected={selectedUserId === user.id}
                onClick={handleChangeUser}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

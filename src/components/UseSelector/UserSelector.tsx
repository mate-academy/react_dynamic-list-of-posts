import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { DropdownMenu, DropdownTrigger } from './index';
import {
  User,
  Error,
  UserSelectorProps,
} from '../../types';
import { getUsersFromServer } from '../../api';

export const UserSelector: React.FC<UserSelectorProps> = ({
  currentUserId,
  setError,
  handleUserSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getUsers = async () => {
    try {
      const data = await getUsersFromServer();

      setUsers(data);
    } catch {
      setError(Error.GetUsers);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDocumentClick = useCallback(event => {
    const trigger = event.target.closest('.dropdown-trigger');
    const item = event.target.matches('.dropdown-item');

    if (!isOpen) {
      return;
    }

    if (trigger || item) {
      return;
    }

    setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  const selectUser = (userId: number) => {
    handleUserSelect(userId);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const userName = users.find(({ id }) => id === currentUserId)?.name;

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >

      <DropdownTrigger
        userName={userName || ''}
        toggleDropdown={toggleDropdown}
      />

      <DropdownMenu
        users={users}
        selectUser={selectUser}
      />
    </div>
  );
};

/* eslint-disable react/display-name */
import { memo, useEffect, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  selectedUser: User | null;
  setSelectUser: (user: User) => void;
}

export const UserSelector = memo((props: Props) => {
  const { users, selectedUser, setSelectUser } = props;

  const [selectValue, setSelectValue] = useState<string>('Choose a user');
  const [isSelectActive, setIsSelectActive] = useState<boolean>(false);

  const clickSelectHandler = (user: User) => {
    setSelectUser(user);
    setSelectValue(user.name);
    setIsSelectActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest('.dropdown') === null) {
      setIsSelectActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isSelectActive })}
    >
      <div
        className="dropdown-trigger"
        onClick={() => setIsSelectActive(prev => !prev)}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectValue}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user, index) => (
            <a
              key={user.id}
              href={`#user-${index}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => clickSelectHandler(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

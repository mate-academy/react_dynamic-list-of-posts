import cn from 'classnames';
import { useState, FC, useEffect } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

export const UserSelector: FC<Props> = ({ setSelectedUser }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [activeUser, setActiveUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropDownActive(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropDownActive })}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownActive(!isDropDownActive)}
        >

          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map(user => {
              return (
                <a
                  href={`#user-${user.id}`}
                  className={cn('dropdown-item', {
                    'is-active': user.id === activeUser?.id,
                  })}
                  key={user.id}
                  onClick={() => {
                    setActiveUser(user);
                    setIsDropDownActive(false);
                    setSelectedUser(user);
                  }}
                >
                  {user.name}
                </a>
              );
            })
          }
          {/*
          <a href="#user-1" className="dropdown-item">Leanne Graham</a>
          <a href="#user-2" className="dropdown-item ">Ervin Howell</a>
          <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
          <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
          <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a>
          */}
        </div>
      </div>
    </div>
  );
};

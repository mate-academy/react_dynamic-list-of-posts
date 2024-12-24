import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cl from 'classnames';
import { pause } from '../utils/methods';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  onActiveUser: (v: User) => void;
  activeUser: User | null;
  onShowSideBar: (v: boolean) => void;
  onActivePost: (v: Post | null) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  onActiveUser,
  activeUser,
  onShowSideBar,
  onActivePost,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickedOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('click', handleClickedOutside);

    return () => {
      document.removeEventListener('click', handleClickedOutside);
    };
  }, []);

  const handleSelectUser = async (user: User) => {
    onActiveUser(user);
    setShowDropDown(false);
    onShowSideBar(false);
    onActivePost(null);
    await pause();
  };

  return (
    <div
      ref={divRef}
      data-cy="UserSelector"
      className={cl('dropdown', {
        'is-active': showDropDown,
      })}
    >
      <div
        className="dropdown-trigger"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

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
              href={`#user-${user.id}`}
              className={cl('dropdown-item', {
                'is-active': activeUser?.id === user.id,
              })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

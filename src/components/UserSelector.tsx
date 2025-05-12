import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
  getPostsByUserId: (userId: number) => void;
  setIsSideBarShown: (isSideBarShown: boolean) => void;
  // isFaAngleDownLoading: boolean;
};

export const UserSelector: React.FC<Props> = ({
  users,
  currentUser,
  setCurrentUser,
  getPostsByUserId,
  setIsSideBarShown,
  // isFaAngleDownLoading,
}) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isShowDropDown ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsShowDropDown(!isShowDropDown);
          }}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

          {/* add condition loading on this button ? */}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="false" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={`dropdown-item ${currentUser?.id === user.id ? 'is-active' : ''}`}
              onClick={() => {
                setCurrentUser(user);
                setIsShowDropDown(!isShowDropDown);
                getPostsByUserId(user.id);
                setIsSideBarShown(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

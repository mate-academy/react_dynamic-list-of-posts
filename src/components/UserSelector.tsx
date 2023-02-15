import React, { useState } from 'react';
// import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  selectedUser:User,
  users:User[],
  setUser: (value: User)=> void,
  setPosts:(value: any)=> void,
  getDataFromApi: any,
  setDetailsSeen: (value: boolean)=> void,
  setIsLoading: (value: boolean)=> void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser, users, setUser,
  setPosts, getDataFromApi, setDetailsSeen, setIsLoading,
}) => {
  const [dropdownValue, setDropdownValue] = useState('Choose a user');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const getUserPosts = async (event: any, user: User) => {
    event.preventDefault();
    setIsDropdownVisible(false);

    if (user.name === dropdownValue) {
      return;
    }

    setIsLoading(true);

    setDetailsSeen(false);

    await getDataFromApi('/posts', setPosts);
    setDropdownValue(user.name);
    setUser(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isDropdownVisible && 'is-active'}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropdownVisible(!isDropdownVisible);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsDropdownVisible(false);
            }, 500);
          }}
        >
          <span>{dropdownValue}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {
            users.map((user: any) => {
              return (
                <a
                  href={user.id}
                  className={`dropdown-item ${selectedUser && selectedUser.id === user.id && 'is-active'}`}
                  onClick={(event) => {
                    getUserPosts(event, user);
                  }}
                  key={user.id}
                >
                  {user.name}
                </a>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type Props = {
  selectedUser:User | null,
  users:User[],
  setUser: (value: User)=> void,
  setPosts:(value: Post[])=> void,
  setDetailsSeen: (value: boolean)=> void,
  setIsLoading: (value: boolean)=> void,
  setIsError: (value: boolean)=> void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser, users, setUser, setIsError,
  setPosts, setDetailsSeen, setIsLoading,
}) => {
  const [dropdownValue, setDropdownValue] = useState('Choose a user');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const getPostsFromApi = async () => {
    try {
      const response = await client.get('/posts');

      if (Array.isArray(response)) {
        await setPosts(response);
      }

      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      if (error) {
        throw new Error(String(error));
      }
    }
  };

  const getUserPosts = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, user: User,
  ) => {
    event.preventDefault();
    setIsDropdownVisible(false);

    if (user.name === dropdownValue) {
      return;
    }

    setIsLoading(true);
    setDetailsSeen(false);
    await getPostsFromApi();
    setDropdownValue(user.name);
    setUser(user);
  };

  const hideDropdown = () => {
    const timeoutID = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 500);

    return () => {
      clearTimeout(timeoutID);
    };
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
          onBlur={hideDropdown}
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
            users.map((user: User) => {
              return (
                <a
                  href={String(user.id)}
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

import React, { useState } from 'react';
import { User } from '../types/User';
import { getPosts } from '../utils/helpers';
import { Post } from '../types/Post';
import { LoadingItems } from '../types/LoadingItems';
import { HasErrorItem } from '../types/ErrorMessage';

type Props = {
  users: User[] | null,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingItems>>,
  setHasError: React.Dispatch<React.SetStateAction<HasErrorItem>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setPosts,
  setIsLoading,
  setHasError,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const handleSelectedUser = async (user: User) => {
    try {
      setSelectedUser(user);
      setIsListVisible(false);
      setIsLoading('Posts');

      const postsFromServer = await getPosts(user.id);

      setPosts(postsFromServer);
    } catch {
      setHasError('Posts');
    } finally {
      setIsLoading('');
    }
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
          onClick={() => setIsListVisible(prev => !prev)}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : (
                'Choose a user'
              )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isListVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleSelectedUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { DropUser } from './DropUser';

type Props = {
  users: User[],
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPostsLoadingError: React.Dispatch<React.SetStateAction<boolean>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setIsLoading,
  setPostsLoadingError,
  setPosts,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setSelectedPost(null);
      setIsLoading(true);
      client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(posts => {
          setPosts(posts);
        })
        .catch(() => setPostsLoadingError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();
    setSelectedUser(user);
    setActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': active,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={() => setActive(!active)}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user' }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 && users.map(user => {
            const isActive = user.id === selectedUser?.id;

            return (
              <DropUser
                user={user}
                isActive={isActive}
                chooseUser={handleClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

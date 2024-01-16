import React, { MouseEventHandler, useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import * as service from '../utils/api';

type Props = {
  users: User[];
  handleChooseUser: MouseEventHandler<HTMLButtonElement>;
  isChoose: boolean;
  setIsChooseUser: (value: number | null) => void;
  setIsChoose: (value: boolean) => void;
  setUserPosts: (posts: Post[]) => void;
  setIsError: (value: boolean) => void,
  setIsLoading: (value: boolean) => void,
  setIsOpenComment: (value: null | number) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  handleChooseUser,
  isChoose,
  setIsChooseUser,
  setIsChoose,
  setUserPosts,
  setIsError,
  setIsLoading,
  setIsOpenComment,
}) => {
  const [selectedUserName, setSelectedUserName] = useState('');

  const handleChooseClick = async (userId: number, userName: string) => {
    setSelectedUserName(userName);
    setIsChooseUser(userId);
    setIsChoose(!isChoose);
    setIsLoading(true);
    setIsOpenComment(null);
    try {
      const postsFromServer = await service.getPosts(userId);

      setUserPosts(postsFromServer);
    } catch {
      setIsError(true);
      setIsOpenComment(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsChoose(false);
  }, [users, setIsChoose]);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleChooseUser}
        >
          <span>{selectedUserName || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isChoose && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                onClick={() => {
                  handleChooseClick(user.id, user.name);
                }}
                href={`#user-${user.id}`}
                className="dropdown-item"
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

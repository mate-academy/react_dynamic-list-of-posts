import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { UserOption } from './UserOption/UserOption';

type Props = {
  selectedId: number | null;
  setSelectedUser: (user: User | null) => void;
  loadPosts: (id: number) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string) => void;
  selectedUser: User | null;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedId,
  setSelectedUser,
  loadPosts,
  setIsLoading,
  setError,
  selectedUser,
  setSelectedPost,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    if (isSelectOpen) {
      setIsLoading(true);

      getUsers()
        .then(data => {
          setUsers(data);
        })
        .catch(() => {
          setError(
            'User can\'t be selected. Please, check internet connection',
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isSelectOpen]);

  const selectUserHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    e.preventDefault();

    setSelectedPost(null);
    setSelectedUser(user);
    setIsSelectOpen(false);
    loadPosts(user.id);
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
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelectOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.length && users.map(user => (
              <UserOption
                user={user}
                selectedId={selectedId}
                selectUserHandler={selectUserHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

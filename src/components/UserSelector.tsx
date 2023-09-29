import React, { useEffect, useState, useContext } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/Users';
import { getPosts } from '../api/Posts';
import { PostContext } from '../PostContext';

type Props = {
  selectedUser: User | null,
  setSelectedUser: (user: User | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const {
    setPosts,
    setIsPostLoading,
    setIsPostLoadError,
  } = useContext(PostContext);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsSelectOpen(false);
    setIsPostLoading(true);
    setIsPostLoadError(false);
    getPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setIsPostLoading(false);
        setIsPostLoadError(true);
        setPosts([]);
      })
      .finally(() => {
        setIsPostLoading(false);
      });
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
          onBlur={() => setIsSelectOpen(false)}
        >
          <span>{selectedUser ? `${selectedUser.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelectOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href="#user-1"
                className="dropdown-item"
                key={user.id}
                onMouseDown={() => handleUserSelect(user)}
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

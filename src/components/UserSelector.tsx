import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[]
  showUsers: boolean
  setShowUsers: (value: boolean) => void
  selectedUser: number
  setSelectedUser: (value: number) => void
  fetchPosts: (value: number) => void
  setPostId: (value: number) => void
};

export const UserSelector: React.FC<Props> = ({
  showUsers,
  setShowUsers,
  users,
  selectedUser,
  setSelectedUser,
  fetchPosts,
  setPostId,
}) => {
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
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          {selectedUser === 0
            ? (<span>Choose a user</span>)
            : (<span>{users[selectedUser - 1].name}</span>)}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {showUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <>
                {selectedUser === user.id
                  ? (
                    <a
                      key={user.id}
                      href={`#user-${user.id}`}
                      className="dropdown-item is-active"
                      onClick={() => {
                        setShowUsers(!showUsers);
                      }}
                    >
                      {user.name}
                    </a>
                  )
                  : (
                    <a
                      key={user.id}
                      href={`#user-${user.id}`}
                      className="dropdown-item is-active"
                      onClick={() => {
                        setShowUsers(!showUsers);
                        setSelectedUser(user.id);
                        fetchPosts(user.id);
                        setPostId(0);
                      }}
                    >
                      {user.name}
                    </a>
                  )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

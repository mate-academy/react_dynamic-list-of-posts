import React, { useState, useEffect } from 'react';
import { User } from '../types/User';

type Props = {
  setShowError: (val: boolean) => void,
  setTrgetUserId: (num: number) => void,
};

export const UserSelector: React.FC<Props> = ({
  setShowError,
  setTrgetUserId,
}) => {
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [targetUser, setTargetUser] = useState<User | null>(null);

  async function getUser() {
    const BASE_URL = 'https://mate.academy/students-api/users';

    const allUsers = await fetch(BASE_URL)
      .then(resp => resp.json());

    try {
      setUsers(allUsers);
      setShowError(false);
    } catch (error) {
      setShowError(true);
    }
  }

  useEffect(() => {
    if (!targetUser) {
      return;
    }

    setTrgetUserId(targetUser.id);
  }, [targetUser]);

  useEffect(() => {
    getUser();
  }, []);

  const selectedUser = (
    event: React.MouseEvent,
    user: User,
  ) => {
    event.preventDefault();
    setShowUsers(false);
    setTargetUser(user);
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
          onClick={() => setShowUsers(!showUsers)}
        >
          {targetUser
            ? (
              <span>{targetUser.name}</span>
            ) : (
              <span>Choose a user</span>
            )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {showUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={(e) => selectedUser(e, user)}
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

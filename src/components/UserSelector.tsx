import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  setSelectedUserId: (userId: number) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  setSelectedUserId,
  setSelectedPost,
}) => {
  const [openList, setOpenList] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectUserName, setSelectUserName] = useState('');

  useEffect(() => {
    client.get<User[]>('/users').then(res => setUsers(res));
  }, []);

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
          onClick={() => setOpenList(boolean => !boolean)}
        >
          <span>{selectUserName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {openList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                onClick={() => {
                  setSelectUserName(user.name);
                  setSelectedUserId(user.id);
                  setOpenList(false);
                  setSelectedPost(null);
                }}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectUserName === user.name },
                )}
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

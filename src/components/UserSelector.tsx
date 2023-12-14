import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from './PostsProvider';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Error } from '../types/Error';
import { URL } from '../types/Url';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isUsersShown, setIsUsersShown] = useState(false);
  const haveUsers = !!users.length;

  const handleSelectUser = async (user: User) => {
    try {
      dispatch({ type: 'selectUser', payload: user });
      setIsUsersShown(!isUsersShown);

      const posts = await client.get<Post[]>(`${URL.Posts}?userId=${user.id}`);

      dispatch({ type: 'loadPosts', payload: posts });
    } catch (error) {
      dispatch({ type: 'error', payload: Error.Posts });
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
          onClick={() => setIsUsersShown(!isUsersShown)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {
        isUsersShown && haveUsers && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {
                users.map(user => (
                  <a
                    href={`#user-${user.id}`}
                    className="dropdown-item"
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                  >
                    {user.name}
                  </a>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

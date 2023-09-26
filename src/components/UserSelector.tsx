import React, {
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  getPost,
} from '../utils/loadutil';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';

type Props = {
  allUsers: User[],
  setPosts: (posts: Post[]) => void,
};

export const UserSelector: React.FC<Props> = ({ allUsers, setPosts }) => {
  const [showUsers, setShowUsers] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState('Choose a user');
  const { dispatch } = useContext(StateContext);

  function chooseUser(user: User) {
    setShowUsers(!showUsers);
    dispatch({ type: ACTIONS.IS_LOADING, payload: true });
    setIsUserSelected(user.name);
    dispatch({ type: ACTIONS.SET_SELECTED_USER, payload: user });
    getPost(user.id)
      .then(res => {
        if ('error' in res) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' });
        }

        setPosts(res);
      })
      .catch(() => {
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' });
      })
      .finally(() => dispatch({ type: ACTIONS.IS_LOADING, payload: false }));
    dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: {} as Post });
  }

  function handleUserSelect() {
    setShowUsers(!showUsers);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >
      <div
        className="dropdown-trigger"
        onClick={handleUserSelect}
        onKeyDown={handleUserSelect}
        role="listbox"
        tabIndex={0}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {isUserSelected}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => chooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

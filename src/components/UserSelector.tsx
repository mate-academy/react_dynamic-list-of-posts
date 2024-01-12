import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../PostsContext';
import { getUsers } from '../api/posts';
import { User } from '../types/User';
import { ReducerType } from '../types/ReducerType';

export const UserSelector: React.FC = () => {
  const { user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isListShown, setIsListShown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleDropdownChoose = (item: User) => {
    setIsListShown(false);
    dispatch({
      type: ReducerType.SetUser,
      payload: item,
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
          onClick={() => setIsListShown(!isListShown)}
        >
          <span>
            {
              user?.name
                || 'Choose a user'
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isListShown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div
            className="dropdown-content"
            style={{ overflow: 'auto', height: '300px' }}
          >
            {
              users.map((item) => {
                const { id, name } = item;

                return (
                  <a
                    key={id}
                    href={`#user-${id}`}
                    className={classNames('dropdown-item', {
                      'is-active': user?.id === id,
                    })}
                    onClick={() => handleDropdownChoose(item)}
                  >
                    {name}
                  </a>
                );
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

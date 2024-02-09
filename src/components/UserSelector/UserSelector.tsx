import React, { useCallback, useContext, useState } from 'react';
import cn from 'classnames';
import { getPosts } from '../../api/posts';
import { MainContext } from '../MainContext/MainContext';
import { User } from '../../types/User';
import { Errors } from '../../types/Errors';

type Props = {
  choosedUser?: User,
  setChoosedUser: (value: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  choosedUser,
  setChoosedUser,
}) => {
  const {
    users,
    setPosts,
    setError,
    setIsLoading,
    setChosenPost,
  } = useContext(MainContext);

  const [isActive, setIsActive] = useState(false);

  const handleChooseUser = (user: User) => {
    setIsLoading(true);
    setChoosedUser(user);
    setIsActive(false);
    setPosts([]);
    setChosenPost(null);
    setError(Errors.NONE);

    getPosts(user.id)
      .then(setPosts)
      .catch(() => setError(Errors.POST))
      .finally(() => setIsLoading(false));
  };

  const handleBlur = useCallback(() => setTimeout(() => {
    if (isActive) {
      setIsActive(false);
    }
  }, 170), [isActive]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActive,
      })}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
        >
          <span>
            {choosedUser ? (choosedUser?.name) : ('Choose a user')}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
          onBlur={() => setIsActive(false)}
        >
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === choosedUser?.id,
              })}
              onClick={() => handleChooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

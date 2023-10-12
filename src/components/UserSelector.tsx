import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  chooseUser?: User | null,
  setUser: (user: User) => void,
  setPosts: (post: Post[]) => void,
  setIsNoPost: (bool: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  chooseUser = null,
  setUser,
  setPosts,
  setIsNoPost,
}) => {
  const [isActibeDropDown, setIsActibeDropDown] = useState(false);

  const handlerDropDownMenuActive = () => {
    setIsActibeDropDown(!isActibeDropDown);
  };

  const handlerSetUser = (user: User) => {
    if (user === chooseUser) {
      setIsActibeDropDown(false);

      return;
    }

    setUser(user);
    setPosts([]);
    setIsNoPost(false);
    setIsActibeDropDown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActibeDropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handlerDropDownMenuActive}
        >
          {chooseUser
            ? <span>{chooseUser.name}</span>
            : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user: User) => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': (chooseUser && chooseUser === user),
              })}
              key={user.id}
              onClick={() => handlerSetUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useCallback, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  setChooseUser: (user: User | null) => void;
  chooseUser: User | null;
  allUsers: User[] | null;
  setAllPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
  setChoosePost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  setChooseUser,
  allUsers,
  chooseUser,
  setAllPosts,
  setChoosePost,
}) => {
  const [showUsers, setShowUsers] = useState(false);

  const selectUser = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, user: User) => {
      event.preventDefault();
      setAllPosts(null);
      setChoosePost(null);
      setShowUsers(false);
      setChooseUser(user);
    },
    [setChooseUser, setAllPosts, setChoosePost],
  );

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowUsers(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowUsers(false);
            }, 300);
          }}
        >
          <span>{chooseUser ? chooseUser.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers?.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === chooseUser?.id,
                })}
                key={user.id}
                onClick={event => {
                  selectUser(event, user);
                }}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

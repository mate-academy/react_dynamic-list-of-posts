import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

// Api
import { getUsers, getPosts } from '../api';

// Types
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  setPostList: React.Dispatch<React.SetStateAction<Post[] | undefined>>
  setUserSelect: React.Dispatch<React.SetStateAction<User | null>>
  userSelect: User | null
  setPostListError: React.Dispatch<React.SetStateAction<boolean>>
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const UserSelector: React.FC<Props> = ({
  setPostList,
  setUserSelect,
  userSelect,
  setPostListError,
  setOpenForm,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [visibleList, setVisibleList] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
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
          onClick={() => {
            setVisibleList(!visibleList);
          }}
        >
          <span>
            {
              userSelect
                ? userSelect.name
                : 'Choose a user'
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={classNames('dropdown-menu', { 'is-hidden': !visibleList })}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            const selectUser = () => {
              setVisibleList(false);

              if (userSelect && userSelect.id === id) {
                return;
              }

              setUserSelect(user);
              setPostList(undefined);
              getPosts(id)
                .then((posts) => {
                  setPostList(posts);
                  setPostListError(false);
                }).catch(() => {
                  setOpenForm(false);
                  setPostList([]);
                  setPostListError(true);
                });
            };

            return (
              <a
                href={`#user-${id}`}
                className="dropdown-item"
                onClick={selectUser}
                key={id}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

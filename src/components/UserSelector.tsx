import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  usersArray: User[] | [],
  selectedUserId: string,
  setSelectedUser: (userId: string) => void,
  setIsLoadingUserPosts: (load: boolean) => void,
  setOpenUserPost: (
    isOpen: boolean) => void,
  setWriteComment: (load: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  usersArray,
  selectedUserId,
  setSelectedUser,
  setIsLoadingUserPosts,
  setOpenUserPost,
  setWriteComment,
}) => {
  const [dropDown, setDropDown] = useState(false);

  const selectedUserName = selectedUserId
    ? usersArray.find(user => +selectedUserId === user.id)?.name
    : 'Choose a user';

  const handleUserSelected = (userId: number) => {
    if (+selectedUserId !== userId) {
      setIsLoadingUserPosts(true);
      setSelectedUser(`${userId}`);
      setOpenUserPost(false);
    }

    setDropDown(false);
    setWriteComment(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropDown(!dropDown)}
          onBlur={(event) => {
            if (!event.nativeEvent.relatedTarget) {
              setDropDown(false);
            }
          }}
        >
          <span>{selectedUserName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersArray.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': +selectedUserId === id,
                })}
                onClick={() => handleUserSelected(id)}
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

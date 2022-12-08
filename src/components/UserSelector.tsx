import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  users: User[],
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
  selectedUserId: number,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUserId,
  selectedUserId,
  setSelectedPost,
}) => {
  const [isMenuDropped, setIsMenuDropped] = useState(false);
  const dropDownElement = useRef<HTMLDivElement | null>(null);

  const selectUser = (user: User) => {
    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
    }
  };

  const selectedUserName = users.find(x => x.id === selectedUserId)?.name;

  const handleOnBlur = (event: MouseEvent) => {
    if (!dropDownElement.current?.contains(event.target as HTMLElement)) {
      setIsMenuDropped(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  });

  const handleOnClick = (user: User) => {
    selectUser(user);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isMenuDropped },
      )}
    >
      <div
        className="dropdown-trigger"
        ref={dropDownElement}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuDropped(prev => !prev)}
        >

          <span>
            {selectedUserId === -1
              ? 'Choose a user'
              : selectedUserName}

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
        <div className="dropdown-content">
          {users.map((user) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                onClick={() => handleOnClick(user)}
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

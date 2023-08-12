import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  setSelectedPost: (post: Post | null) => void,
  setComments: (comments: Comment[]) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
  setComments,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current
        .contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectUser = (user: User) => {
    if (user.id !== selectedUser?.id) {
      setIsOpen(false);
      setSelectedPost(null);
      setComments([]);
      setSelectedUser(user);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpen },
      )}
    >
      <div
        className="dropdown-trigger"
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
          ref={dropdownRef}
        >
          {selectedUser
            ? <span>{selectedUser.name}</span>
            : <span>Choose a user</span>}

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
        >
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': id === selectedUser?.id },
                )}
                onClick={() => handleSelectUser(user)}
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

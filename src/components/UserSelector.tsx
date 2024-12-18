import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  userId,
  setUserId,
  setSelectedPost,
}) => {
  const [showList, setShowList] = useState(false);
  const [userName, setUserName] = useState('Choose a user');

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setShowList(false);
    }
  };

  const handleToggle = () => {
    setShowList(!showList);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showList })}
      ref={dropdownRef}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{userName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === userId,
              })}
              onClick={() => {
                setUserId(user.id);
                setUserName(user.name);
                setShowList(false);
                setSelectedPost(null);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

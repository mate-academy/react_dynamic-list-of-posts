import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../api/posts';
import { User } from '../types/User';
import { Person } from './Person';
import { Post } from '../types/Post';

type Props = {
  setHasErrorGetPosts: (flag: boolean) => void;
  setIsLoadingPosts: (flag: boolean) => void;
  setPosts: (posts: Post[] | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  setHasErrorGetPosts,
  setIsLoadingPosts,
  setPosts,
}) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('Choose a user');
  const prevUserId = useRef<number | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setHasClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    getUsers()
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch(() => {
        setHasErrorGetPosts(true);
      });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setHasErrorGetPosts]);

  return (
    <div
      ref={dropDownRef}
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setHasClicked(prev => !prev)}
        >
          <span>{selectedUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {hasClicked && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.length > 0 &&
              users.map(user => (
                <Person
                  key={user.id}
                  user={user}
                  setHasErrorGetPosts={setHasErrorGetPosts}
                  setIsLoadingPosts={setIsLoadingPosts}
                  setPosts={setPosts}
                  setHasClicked={setHasClicked}
                  setSelectedUser={setSelectedUser}
                  prevUserId={prevUserId}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setLoading(true);
    setIsOpen(false);
    setError('');
  };

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);

      getUserPosts(selectedUser.id)
        .then(userPosts => {
          setPosts(userPosts);
        })
        .catch(() => {
          setError('Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPosts([]);
    }
  }, [selectedUser]);

  return (
    <>
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', { 'is-active': isOpen })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={toggleDropdown}
          >
            <span>{selectedUser ? selectedUser?.name : 'Choose a user'} </span>

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
                className="dropdown-item"
                key={user.id}
                onClick={e => {
                  e.preventDefault();
                  handleUserSelect(user);
                }}
              >
                {user.name}
              </a>
            ))}
            {/* <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a> */}
          </div>
        </div>
      </div>

      <div className="block" data-cy="MainContent">
        {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

        {loading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            {error}
          </div>
        )}

        {selectedUser && !error && posts.length === 0 && !loading && (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        )}

        {selectedUser && !error && posts.length > 0 && !loading && (
          <PostsList posts={posts} />
        )}
      </div>
    </>
  );
};

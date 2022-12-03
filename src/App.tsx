import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Errors } from './types/Errors';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>();
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [posts, setPosts] = React.useState<Post[]>();
  const [selectedPost, setSelectedPost] = React.useState<Post>();
  const [error, setError] = React.useState(Errors.None);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getUsers()
      .then(result => setUsers(result))
      .catch(() => setError(Errors.Common));
  }, []);

  React.useEffect(() => {
    setSelectedPost(undefined);
    setPosts(undefined);

    if (selectedUser) {
      setIsLoading(true);
      getUserPosts(selectedUser.id)
        .then(result => setPosts(result))
        .catch(() => setError(Errors.Common))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {error !== Errors.None && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {posts
                  && (posts.length === 0
                    ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )
                    : (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails selectedPost={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

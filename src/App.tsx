import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | undefined>();

  const handleSelectUser = (selectedUser: User) => {
    setUser(selectedUser);
    setIsLoading(true);
  };

  useEffect(() => {
    if (user) {
      client.get(`/posts?userId=${user.id}`)
        .then(data => setUserPosts(data as Post[]))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  user={user}
                  onSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading && <Loader />}

                {!isLoading && !user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {!isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading && user && !userPosts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoading
                  && user
                  && !!userPosts.length
                  && (
                    <PostsList
                      post={post}
                      posts={userPosts}
                      onSelect={setPost}
                    />
                  )}
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
              {
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={post} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

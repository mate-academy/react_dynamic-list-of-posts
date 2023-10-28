import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPosts, getUsers } from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postsError, SetPostsError] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    SetPostsError(false);
    setIsLoading(true);

    getPosts(userId)
      .then(setPosts)
      .catch(() => {
        SetPostsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userId={userId}
                  setUserId={setUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && userId > 0 && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userId > 0 && (
                  <PostsList
                    postId={postId}
                    setPostId={setPostId}
                    posts={posts}
                  />
                )}
              </div>
            </div>
          </div>

          {postId > 0 && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  postId={postId}
                  posts={posts}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { Post } from './types/Post';

import { getPostsByUser } from './api/api';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasPost, setHasPost] = useState(false);

  useEffect(() => {
    if (selectedUserId) {
      setIsLoading(true);
      setHasPost(false);
      getPostsByUser(selectedUserId).then((res) => {
        setPosts(res);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (!posts.length && selectedUserId !== 0) {
      setHasPost(true);
    } else {
      setHasPost(false);
    }
  }, [posts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  setPost={setPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(posts.length > 0 && !isLoading) && (
                  <PostsList
                    posts={posts}
                    currentPost={post}
                    setPost={setPost}
                  />
                )}

                {hasPost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': post },
            )}
          >
            {post && (
              <div className="tile is-child box is-success ">
                <PostDetails post={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

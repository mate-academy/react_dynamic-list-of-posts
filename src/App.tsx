import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [targetUserId, setTrgetUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [targetPost, setTargetPost] = useState<Post | null>(null);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const getPosts = async (userId: number) => {
    setIsLoading(true);
    const url = `/posts?userId=${userId}`;

    const userPosts: Post[] = await client.get(url);

    try {
      setPosts(userPosts);
      setShowError(false);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    getPosts(targetUserId);
    setTargetPost(null);
    setIsOpenForm(false);
  }, [targetUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setShowError={setShowError}
                  setTrgetUserId={setTrgetUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!targetUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {
                  (!isLoading && !posts.length && targetUserId)
                    && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )
                }

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    targetPost={targetPost}
                    isOpen={isOpenForm}
                    setTargetPost={setTargetPost}
                    setIsOpen={setIsOpenForm}
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
                'Sidebar--open': targetPost && isOpenForm,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {targetPost && <PostDetails targetPost={targetPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

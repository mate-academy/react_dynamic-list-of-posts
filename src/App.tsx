import React, { useCallback, useEffect, useState } from 'react';
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
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingPostsFinished, setIsLoadingPostsFinished] = useState(false);
  const [isErrorInLoading, setIsErrorInLoading] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(0);

  const handleSelectedUserId = useCallback((id: number) => {
    setSelectedUserId(id);
  }, []);

  const handleSelectedPostID = useCallback((id) => {
    setSelectedPostID(id);
  }, []);

  useEffect(
    () => {
      if (selectedUserId !== 0) {
        setIsLoadingPosts(true);
        client.get<Post[]>(`/posts?userId=${selectedUserId}`)
          .then(result => {
            setPosts(result.map(post => ({
              id: post.id,
              userId: post.userId,
              title: post.title,
              body: post.body,
            })));
          })
          .catch(() => setIsErrorInLoading(true))
          .finally(() => {
            setIsLoadingPosts(false);
            setIsLoadingPostsFinished(true);
          });
      }
    },
    [selectedUserId],
  );

  const postToShow = posts.find(post => post.id === selectedPostID) || null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userID={selectedUserId}
                  setUserID={handleSelectedUserId}
                  setPostID={handleSelectedPostID}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && <Loader />}

                {selectedUserId !== 0 && (
                  <>
                    {isErrorInLoading && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {posts.length === 0 && isLoadingPostsFinished && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectPost={handleSelectedPostID}
                        selectedPostID={selectedPostID}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {selectedPostID !== 0 && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': posts.length > 0 },
              )}
            >
              {postToShow && (
                <div
                  className="tile is-child box is-success "
                >
                  <PostDetails
                    post={postToShow}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

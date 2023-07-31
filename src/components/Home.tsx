import React, { useContext, useEffect, useState } from 'react';

import cn from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsContext } from '../context/postsContext';
import { getPostsByUserId } from '../api/posts.api';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    posts,
    errorMessage,
    selectedPost,
    selectedUser,
    setPosts,
    setErrorMessage,
  } = useContext(PostsContext);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);

    getPostsByUserId(selectedUser.id)
      .then(postsFromServer => {
        setPosts(() => postsFromServer);
      })
      .catch(() => {
        setErrorMessage('Cannot load posts.');
        throw new Error('Cannot load posts.');
      })
      .finally(() => setLoading(false));
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {errorMessage && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}

                    {!errorMessage && posts.length === 0 && selectedUser && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    { posts.length > 0 && <PostsList posts={posts} />}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

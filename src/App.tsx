import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { getUserPosts } from './utils/getUserPosts';

export const App: React.FC = () => {
  const [isSelectedUser, setIsSelectedUser] = useState<number | null>(null);
  const [isSelectedPost, setIsSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState('');

  const isError = message === 'Something went wrong!';

  const handleSelectedUser = (userId: number) => {
    setIsSelectedUser(userId);
    setLoading(true);
    setMessage('');

    getUserPosts(userId)
      .then(response => {
        setPosts(response);

        if (!response.length) {
          setMessage('No posts yet');
        }
      })
      .catch(() => setMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector select={handleSelectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!isSelectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && isSelectedUser && <Loader />}

                {!posts.length && isSelectedUser && !loading && (
                  <div
                    className={cn('notification', {
                      'is-danger': isError,
                      'is-warning': !isError,
                    })}
                    data-cy={isError ? 'PostsLoadingError' : 'NoPostsYet'}
                  >
                    {message}
                  </div>
                )}

                {posts.length > 0 && !loading && (
                  <PostsList
                    posts={posts}
                    isSelectedPost={isSelectedPost}
                    setOpenDetails={setIsSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {isSelectedPost && (
            <div
              data-cy="Sidebar"
              className={cn(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={isSelectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

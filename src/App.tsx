import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUserPosts = (userId: number) => {
    setIsLoaded(false);
    setIsError(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => {
    setSelectedPost(null);

    if (user) {
      loadUserPosts(user.id);
    } else {
      setPosts([]);
    }
  }, [user?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={user}
                  onChangeUser={setUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {user && !isLoaded && (
                  <Loader />
                )}

                {user && isLoaded && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {user && isLoaded && !isError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && isLoaded && !isError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

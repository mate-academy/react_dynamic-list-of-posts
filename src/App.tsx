import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import { User, Post } from './types';
import { getPosts } from './services';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasPostsLoadingError, setHasPostsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const showNoPostsYet =
    !!selectedUser && !isLoading && !hasPostsLoadingError && !posts.length;

  const isPostListVisible =
    !!selectedUser && !isLoading && !hasPostsLoadingError && !!posts.length;

  const handleLoadPosts = (userId: User['id']) => {
    setIsLoading(true);
    setHasPostsLoadingError(false);
    setSelectedPost(null);

    getPosts(userId)
      .then(setPosts)
      .catch(() => setHasPostsLoadingError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelectedUser={setSelectedUser}
                  onLoadPosts={handleLoadPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {hasPostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostListVisible && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': !!selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

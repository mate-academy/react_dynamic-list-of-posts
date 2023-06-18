import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { User } from './types/User';
import { getPosts } from './api';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPosts = useCallback((userId: number) => {
    setIsLoaded(false);

    getPosts(userId)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      loadPosts(selectedUser.id);
    } else {
      setPosts([]);
    }
  }, [selectedUser]);

  const isUserSelected = Boolean(selectedUser);
  const isLoaderVisible = !isLoaded && isUserSelected;
  const isErrorMessageVisible = isLoaded && isError && isUserSelected;
  const isNoPostsMessageVisible = isLoaded && !isError
    && isUserSelected && !posts.length;
  const isPostsListVisible = isLoaded && !isError
    && isUserSelected && posts.length > 0;
  const isSidebarVisible = selectedPost
    && selectedPost.userId === selectedUser?.id;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  selectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaderVisible && (
                  <Loader />
                )}

                {isErrorMessageVisible && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsMessageVisible && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isPostsListVisible && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    selectPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': isSidebarVisible,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

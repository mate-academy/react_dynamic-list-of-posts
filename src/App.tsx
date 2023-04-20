import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers, getPosts } from './api';
import { Loader } from './components/Loader';

enum Error {
  None,
  PostsLoadingError,
  NoPostsError,
}

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openedPostId, setOpenedPostId] = useState<number | null>(null);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostLoading] = useState(false);
  const [isPostsLoaded, setIsPostLoaded] = useState(false);
  const [error, setError] = useState<Error>(Error.None);

  const selectUserId = (id: number) => {
    setSelectedUserId(id);
  };

  const openPost = (postId: number | null) => {
    setOpenedPostId(postId);
    setOpenedPost(posts.find(post => post.id === postId) || null);
  };

  const clearError = () => {
    setError(Error.None);
  };

  const loadPostsOfUser = (userId: number) => {
    setIsPostLoading(true);
    setIsPostLoaded(false);
    getPosts(userId)
      .then(res => {
        setPosts(res);
        setIsPostLoaded(true);

        if (!res.length) {
          setError(Error.NoPostsError);
          setIsPostLoaded(false);
        }
      })
      .catch(() => {
        setError(Error.PostsLoadingError);
        setPosts([]);
      })
      .finally(() => {
        setIsPostLoading(false);
      });
  };

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res))
      .catch(() => {
        setUsers([]);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={selectUserId}
                  loadPostsOfUser={loadPostsOfUser}
                  clearError={clearError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isPostsLoading && <Loader />}

                {error === Error.PostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {error === Error.NoPostsError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostsLoaded && (
                  <PostsList
                    posts={posts}
                    openPost={openPost}
                    openedPostId={openedPostId}
                  />
                )}
              </div>
            </div>
          </div>

          {openedPostId && (
            <div
              data-cy="Sidebar"
              className="tile is-parent is-8-desktop Sidebar Sidebar--open"
            >
              <div className="tile is-child box is-success ">
                {openedPost && (
                  <PostDetails
                    openedPost={openedPost}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

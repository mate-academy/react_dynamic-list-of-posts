import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingPostsError, setIsLoadingPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isNewCommentFormShown, setIsNewCommentFormShown] = useState(false);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setIsLoadingPostsError(false);
    setIsLoadingPosts(true);
    getPosts(selectedUser.id)
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        setIsLoadingPostsError(true);
        throw error;
      })
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUser]);

  const isUserSelected = useMemo(() => {
    return selectedUser !== null;
  }, [selectedUser]);

  const areTherePosts = useMemo(() => {
    return posts.length !== 0;
  }, [posts]);

  const isNoUserNotifShown = useMemo(() => {
    return !isLoadingPosts && !isUserSelected;
  }, [isLoadingPosts, isUserSelected]);

  const isPostListShown = useMemo(() => {
    return !isLoadingPosts && isUserSelected && !isLoadingPostsError;
  }, [isLoadingPosts, isUserSelected, isLoadingPostsError]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isNoUserNotifShown && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {isLoadingPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostListShown &&
                  (areTherePosts ? (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                      setIsNewCommentFormShown={setIsNewCommentFormShown}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isNewCommentFormShown={isNewCommentFormShown}
                  setIsNewCommentFormShown={setIsNewCommentFormShown}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

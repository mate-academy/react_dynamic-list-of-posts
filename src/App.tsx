import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsersPosts } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentFormActive, setIsCommentFormActive] = useState(false);

  const isNoPost = !visiblePosts.length
    && !isLoading && selectedUser && !isError;
  const isPostListVisible = !!visiblePosts.length && !isLoading && !isError;

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);

      getUsersPosts(selectedUser.id)
        .then(posts => setVisiblePosts(posts))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }

    return () => {
      setIsError(false);
    };
  }, [selectedUser]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handleSelectPost = (post: Post | null) => {
    setSelectedPost(post);
  };

  const handleCommentForm = (value: boolean) => {
    setIsCommentFormActive(value);
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
                  onUserSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {isNoPost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostListVisible && (
                  <PostsList
                    posts={visiblePosts}
                    selectedPost={selectedPost}
                    onPostSelect={handleSelectPost}
                    onFormStatusChange={handleCommentForm}

                  />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                isCommentFormActive={isCommentFormActive}
                onFormStatusChange={handleCommentForm}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

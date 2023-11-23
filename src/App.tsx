import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Error } from './types/Error';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<Error>({
    users: false,
    posts: false,
    comments: false,
    newComment: false,
  });

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                  onSelectPost={setSelectedPost}
                  onError={setErrors}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {errors.users && (
                  <div className="notification is-danger">
                    There are no users on the server
                  </div>
                )}

                {errors.posts && selectedUser?.id && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length && selectedUser && isPostsLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && (
                  <PostsList
                    selectedUser={selectedUser}
                    posts={posts}
                    isPostsLoading={isPostsLoading}
                    selectedPost={selectedPost}
                    onLoadPosts={setIsPostsLoading}
                    onSelectPost={setSelectedPost}
                    onSetPosts={setPosts}
                    onError={setErrors}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  errors={errors}
                  onError={setErrors}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

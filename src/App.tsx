import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './utils/api';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [postsLoadingError, setPostsLoadingError] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<boolean>(false);

  useEffect(() => {
    getUsers('/users')
      .then((usersFromAPI) => {
        setUsers(usersFromAPI);
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setPosts={setPosts}
                  setIsLoading={setIsLoading}
                  setPostsLoadingError={setPostsLoadingError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser
                && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {postsLoadingError
                && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts && posts.length === 0
                && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts.length > 0
                && (
                  <PostsList
                    posts={posts !== null ? posts : []}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setComments={setComments}
                    setIsCommentLoading={setIsCommentLoading}
                    setCommentsError={setCommentsError}
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
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  setComments={setComments}
                  isCommentLoading={isCommentLoading}
                  commentsError={commentsError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

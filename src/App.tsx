import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as apiService from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    apiService.getUsers().then(setUsers);
  }, []);

  const getPosts = (userId: number) => {
    if (postError) {
      setPostError(false);
    }

    setIsLoading(true);
    apiService.getPosts(userId)
      .then(setPosts)
      .catch(() => setPostError(true))
      .finally(() => setIsLoading(false));
  };

  const getComments = (postValue: Post) => {
    setPost(postValue);
    apiService.getComments(postValue.id)
      .then(setComments);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  getPosts={getPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!posts && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && (
                  <PostsList
                    posts={posts}
                    getComments={getComments}
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
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
              { 'Sidebar--open': openSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {openSidebar && (
                <PostDetails
                  post={post}
                  comments={comments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

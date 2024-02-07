import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import * as clientUsers from './service/users';
import * as clientPosts from './service/post';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [hasForm, setHasForm] = useState(false);

  const currentPost = userPosts.find(post => post.id === selectedPost);

  const havePostValidate = !!selectedUser && !!userPosts.length
    && !isLoading && !hasError;
  const noPostValidate = !!selectedUser && !userPosts.length
    && !isLoading && !hasError;

  const handleSelectedUser = (userId: number) => {
    setIsLoading(true);

    clientPosts.getPosts(`/posts?userId=${userId}`)
      .then(setUserPosts)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setOpenComments(false);

    setSelectedUser(userId);
  };

  useEffect(() => {
    clientUsers.getUsers('/users')
      .then(setUsers)
      .catch((error) => {
        throw error;
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
                  getUserId={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {(hasError && !isLoading) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostValidate && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {havePostValidate && (
                  <PostsList
                    posts={userPosts}
                    getPostId={setSelectedPost}
                    openButton={setOpenComments}
                    isOpen={openComments}
                    postId={selectedPost}
                    isFormActive={setHasForm}
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
                'Sidebar--open': !!openComments,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!openComments && (
                <PostDetails
                  open={openComments}
                  post={currentPost}
                  isFormActive={setHasForm}
                  form={hasForm}
                />
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

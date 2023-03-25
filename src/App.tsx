import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';

import { useAction, useValues } from './customState';

import { getPosts, getUsers } from './api/api';

import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const users = useValues<User[]>([]);
  const posts = useValues<Post[]>([]);
  const selectedPost = useValues<Post | null>(null);
  const selectedUser = useValues<User | null>(null);
  const isPostsVisible = useAction(false);
  const loading = useAction(false);
  const errors = useAction(false);

  const fetchingUsers = async () => {
    try {
      const response = await getUsers();

      users.changeValue(response);
    } catch (error) {
      errors.changeAction(true);
    }
  };

  const fetchingPosts = async () => {
    if (!selectedUser.currValue) {
      return;
    }

    isPostsVisible.changeAction(false);
    loading.changeAction(true);

    try {
      const response = await getPosts(selectedUser.currValue.id);

      posts.changeValue(response);
      isPostsVisible.changeAction(true);
    } catch (error) {
      isPostsVisible.changeAction(false);
      errors.changeAction(true);
    } finally {
      loading.changeAction(false);
    }
  };

  useEffect(() => {
    fetchingUsers();
  }, []);

  useEffect(() => {
    fetchingPosts();
  }, [selectedUser.currValue]);

  const onChangeUser = (user: User) => {
    selectedUser.changeValue(user);
    selectedPost.changeValue(null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users.currValue}
                  user={selectedUser.currValue}
                  onChangeUser={onChangeUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {loading.currAction && <Loader />}

                {!selectedUser.currValue && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {errors.currAction && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsVisible.currAction && (
                  <PostsList
                    posts={posts.currValue}
                    selectedPostId={selectedPost.currValue?.id || 0}
                    onPost={selectedPost.changeValue}
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
              { 'Sidebar--open': selectedPost.currValue },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                postDetail={selectedPost.currValue}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

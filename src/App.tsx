import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import {
  getUsers, getPosts,
} from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const [typeOfError, setTypeOfError] = useState<Errors>(Errors.None);
  const [isPostsLoading, setPostsLoading] = useState(false);
  const [currPost, setCurrPost] = useState<Post | null>(null);
  const [isFormShown, setFormShown] = useState(false);

  async function getUserList() {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  }

  const selectUser = (user: User) => {
    setCurrPost(null);
    setFormShown(false);
    setCurrUser(user);
  };

  async function loadUserPosts() {
    setTypeOfError(Errors.None);
    try {
      setPostsLoading(true);
      const postFromServer = await getPosts(currUser?.id);

      setPostsList(postFromServer);
    } catch (error) {
      setTypeOfError(Errors.Posts);
    } finally {
      setPostsLoading(false);
    }
  }

  const togglePost = (post: Post) => {
    setFormShown(false);
    setCurrPost(currentPost => {
      if (currentPost?.id === post.id) {
        return null;
      }

      return post;
    });
  };

  const showForm = () => {
    setFormShown(true);
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    loadUserPosts();
  }, [currUser?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currUser={currUser}
                  selectUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currUser && !isPostsLoading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {typeOfError === Errors.Posts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {typeOfError[0].toUpperCase()
                    + typeOfError.slice(1).toLowerCase()}
                  </div>
                )}

                {postsList?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!!postsList && postsList?.length > 0 && (
                  <PostsList
                    posts={postsList}
                    openingPostId={currPost?.id || null}
                    togglePost={togglePost}
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
              { 'Sidebar--open': !!currPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={currPost}
                user={currUser}
                typeOfError={typeOfError}
                setTypeOfError={setTypeOfError}
                isFormShown={isFormShown}
                showForm={showForm}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

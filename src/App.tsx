import React, { useEffect, useMemo, useState } from 'react';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { apiActions } from './utils/apiActions';
import { Errors } from './types/Errors';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const isAnyPosts = useMemo(() => (
    userPosts.length > 0
  ), [userPosts]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [usersError, setUsersError] = useState(Errors.None);
  const [postsError, setPostsError] = useState(Errors.None);

  const getPosts = (user: User) => {
    setPostsError(Errors.None);
    setIsPostsLoading(true);
    setSelectedUser(user);

    apiActions.getUserPosts(user.id)
      .then((userPostsFromServer) => setUserPosts(userPostsFromServer))
      .catch(() => setPostsError(Errors.Posts))
      .finally(() => setIsPostsLoading(false));
  };

  const getPost = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    apiActions.getAllUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(() => {
        setUsersError(Errors.Users);
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
                  onPost={getPosts}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {usersError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    {usersError}
                  </div>
                )}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {(!isAnyPosts && selectedUser && !isPostsLoading && !postsError)
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {(isAnyPosts && selectedUser && !isPostsLoading && !postsError)
                  && (
                    <PostsList
                      posts={userPosts}
                      onPost={getPost}
                      selectedPost={selectedPost}
                      onSelectedPost={setSelectedPost}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

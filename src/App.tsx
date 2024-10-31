import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { getUsers } from './services/user';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './services/post';
import { Loader } from './components/Loader';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpenedNewCommentForm, setIsOpenedNewCommentForm] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const showNoPost =
    selectedUser && !isLoading && error.length === 0 && posts?.length === 0;
  const showPostList =
    selectedUser &&
    !isLoading &&
    error.length === 0 &&
    posts &&
    posts.length > 0;

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(usersLoadingError => {
        setError(`usersLoadingError ${usersLoadingError}`);

        throw usersLoadingError;
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      // setError(false);
      setError('');
      setPosts(null);
      setSelectedPost(null);
      setIsOpenedNewCommentForm(false);

      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(loadingError => {
          setError(`postsLoadingError ${loadingError}`);

          throw loadingError;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {users && users.length > 0 && (
                  <UserSelector
                    usersList={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {users && !selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {!isLoading && error.length > 0 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostList && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
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
                    isOpenedNewCommentForm={isOpenedNewCommentForm}
                    onOpenNewCommentForm={setIsOpenedNewCommentForm}
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

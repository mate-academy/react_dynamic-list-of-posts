import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';

import * as userService from './api/Users';
import * as postService from './api/Posts';

import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    userService
      .getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Error uploading users from server'));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      setErrorMessage('');
      setPosts([]);
      setSelectedPost(null);
      setIsOpenSidebar(false);

      postService
        .getPosts(selectedUser.id)
        .then(postsFromServer => {
          setPosts(postsFromServer);
        })
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    } else {
      setPosts([]);
    }
  }, [selectedUser]);

  const shouldShowNoPostsYet =
    !loading && !errorMessage && selectedUser && posts.length === 0;

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
                  onSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {!loading && errorMessage.length > 0 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {shouldShowNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    isOpenSidebar={isOpenSidebar}
                    onIsOpenSidebar={setIsOpenSidebar}
                    selectedPost={selectedPost}
                    onSelectPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': isOpenSidebar,
            })}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

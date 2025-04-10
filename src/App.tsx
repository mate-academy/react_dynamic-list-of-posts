import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './components/api/users';
import { getPosts } from './components/api/fetchPosts';
import { PostDetails } from './components/PostDetails';

import { Post } from './types/Post';
import { User } from './types/User';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [errorPosts, setErrorPosts] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    setErrorPosts(false);
    const fetchData = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch {
        setErrorPosts(true);
      }
    };

    fetchData();
  }, []);

  const loadPosts = async (user: User) => {
    setErrorPosts(false);
    setLoadingPosts(true);
    try {
      const userPosts = await getPosts(user.id);

      setPosts(userPosts);
    } catch {
      setErrorPosts(true);
    } finally {
      setLoadingPosts(false);
    }
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);

    loadPosts(user);
  };

  const notificationNoPosts =
    !errorPosts && !loadingPosts && selectedUser && posts.length === 0;

  const visiblePostList =
    !errorPosts && selectedUser && !loadingPosts && posts.length !== 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {errorPosts && selectedUser && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {notificationNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {visiblePostList && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

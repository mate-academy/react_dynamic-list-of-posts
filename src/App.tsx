import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts, getUsers } from './api/api';
import cn from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const isLoading = loadingUser || loadingPost;

  const loadUsers = async () => {
    setLoadingUser(true);
    setIsError(false);
    try {
      const userFromServer = await getUsers();

      setUsers(userFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (userId: number) => {
    setIsError(false);
    setLoadingPost(true);

    try {
      const postsFromServer = await getPosts(userId);

      setPosts(postsFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoadingPost(false);
    }
  };

  useEffect(() => {
    setPosts(null);
    setSelectedPost(null);
    if (!selectedUser) {
      return;
    }

    loadPosts(selectedUser.id);
  }, [selectedUser]);

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

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && !isError && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && !isLoading && !isError && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': !!selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

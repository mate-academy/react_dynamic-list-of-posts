import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { getHashValue } from './utils/urlGetter';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [areLoading, setareLoading] = useState(false);
  const [isErrorFetchPosts, setIsErrorFetchPosts] = useState(false);

  //#region useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await client.get<User[]>('/users');

        setUsers(result);

        const usernameFromHash = getHashValue();
        const user = result.find(usr => usr.name === usernameFromHash);

        if (user) {
          setSelectedUser(user);
        }
      } catch {}
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const fetchPosts = async () => {
      setIsErrorFetchPosts(false);
      setareLoading(true);
      try {
        const result = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setUserPosts(result);
      } catch {
        setIsErrorFetchPosts(true);
      } finally {
        setareLoading(false);
      }
    };

    fetchPosts();
  }, [selectedUser]);
  //#endregion

  //#region handlers
  const handleUserSelect = (newUser: User) => {
    setSelectedUser(newUser);
    setSelectedPost(null);
  };

  const handlePostSelect = (newPost: Post | null) => {
    setSelectedPost(newPost);
  };
  //#endregion

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
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {areLoading && <Loader />}

                {!areLoading && isErrorFetchPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!areLoading && !userPosts.length && !isErrorFetchPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!areLoading && userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onPostSelect={handlePostSelect}
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

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    setUsersError(false);

    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setUsersError(true))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);

      return;
    }

    setLoadingPosts(true);
    setPostsError(false);
    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
  };

  const showNoPosts =
    selectedUser && !loadingPosts && !postsError && posts.length === 0;
  const showPosts =
    selectedUser && !loadingPosts && !postsError && posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {loadingUsers && <Loader />}

                {usersError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!usersError && (
                  <UserSelector
                    users={users}
                    selectedUser={selectedUser}
                    onUserSelect={handleUserSelect}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && loadingPosts && <Loader />}

                {selectedUser && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={posts}
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

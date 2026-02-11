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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, []);

  const handleSelectUser = (newUser: User) => {
    if (selectedUser?.id === newUser.id) {
      return;
    }

    setIsError(false);
    setIsPostsLoading(true);
    setSelectedUser(newUser);
    setSelectedPost(null);
    getPosts(newUser.id)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsPostsLoading(false));
  };

  const handleSelectPost = (id: number) => {
    const newPost = posts.find(post => post.id === id) || null;

    if (newPost?.id === selectedPost?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(newPost);
  };

  const isNoPostError =
    !isError && !isPostsLoading && selectedUser && !(posts.length > 0);

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
                  onSelectedChange={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isPostsLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!selectedUser && !isPostsLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && !isPostsLoading && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelected={handleSelectPost}
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

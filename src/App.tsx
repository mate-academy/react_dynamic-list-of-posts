import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/userApi';
import { Post } from './types/Post';
import { getPosts } from './api/postApi';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoadingPosts(true);
    setHasPostsError(false);
    setSelectedPost(null);

    const loadPosts = async () => {
      try {
        const loadedPosts = await getPosts(selectedUser.id);

        setPosts(loadedPosts);
      } catch {
        setHasPostsError(true);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  const isNoPosts =
    selectedUser && !hasPostsError && !isLoadingPosts && posts.length === 0;

  const isRenderPostsList =
    selectedUser && !hasPostsError && !isLoadingPosts && posts.length > 0;

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
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isRenderPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={setSelectedPost}
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
              { 'Sidebar--open': Boolean(selectedPost) },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

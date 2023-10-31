import React, {
  useEffect,
  useState,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  getPosts,
  getUsers,
} from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = async () => {
    const loadingUsers = await getUsers();

    setUsers(loadingUsers);
  };

  const loadPosts = async () => {
    if (choosenUser) {
      const loadingPosts = await getPosts(choosenUser.id);

      setPosts(loadingPosts);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setPosts(null);
    setIsError(false);
    loadPosts();
  }, [choosenUser]);

  const handleUserSelect = (user: User) => {
    setSelectedPost(null);
    setChoosenUser(user);
  };

  const handlePostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  choosenUser={choosenUser}
                  handleUserSelect={handleUserSelect}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!choosenUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {!posts && choosenUser && (
                  <Loader />
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts?.length && posts !== null && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts?.length && (
                  <PostsList
                    posts={posts}
                    handlePostSelect={handlePostSelect}
                    selectedPostId={selectedPost?.id || 0}
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
              { 'Sidebar--open': selectedPost?.id },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  setIsError={setIsError}
                  error={isError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

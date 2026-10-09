import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import type { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
};

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsState, setPostsState] = useState<PostsState>({
    posts: [],
    isLoading: false,
    isError: false,
  });

  const { posts, isLoading, isError } = postsState;

  useEffect(() => {
    client.get<User[]>('/users').then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setPostsState({
        posts: [],
        isLoading: true,
        isError: false,
      });

      client
        .get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(data => {
          setPostsState({
            posts: data,
            isLoading: false,
            isError: false,
          });
        })
        .catch(() => {
          setPostsState({
            posts: [],
            isLoading: false,
            isError: true,
          });
        });
    } else {
      setPostsState({
        posts: [],
        isLoading: false,
        isError: false,
      });
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const hasNoPosts =
    selectedUser && !isLoading && !isError && posts.length === 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  user={selectedUser}
                  onUserSelect={handleUserSelect}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {selectedUser && isLoading && <Loader />}
                {selectedUser && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && !isLoading && !isError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
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
              selectedPost && 'Sidebar--open',
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

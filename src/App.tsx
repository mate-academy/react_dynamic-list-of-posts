import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const selectedPostHandler = (post: Post | null) => {
    setSelectedPost(post);
  };

  const selectedUserHandler = (user: User) => {
    setSelectedUser(user);
  };

  const usersFromServer = async () => {
    try {
      const result: User[] = await client.get('/users');

      setUsers(result);
    } catch {
      setIsError(true);
      setIsLoader(false);
    }
  };

  const postsFromServer = async () => {
    const result: Post[] = await client.get(`/posts?userId=${selectedUser?.id}`);

    setPosts(result);
    setIsLoader(false);
  };

  useEffect(() => {
    setPosts([]);
    setSelectedPost(null);
    if (selectedUser !== null) {
      setIsLoader(true);
    }

    const timeout: NodeJS.Timeout = setTimeout(() => {
      postsFromServer();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedUser]);

  useEffect(() => {
    usersFromServer();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserHandler={selectedUserHandler}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoader && (<Loader />)}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(posts.length === 0 && !isLoader && selectedUser) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostHandler={selectedPostHandler}
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
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

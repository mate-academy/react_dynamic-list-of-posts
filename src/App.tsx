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
import { getUsers } from './api/users';
import { SelectedUser } from './types/SelectedUser';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { SelectedPost } from './types/SelectedPost';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [error, setError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [selectedPost, setSelectedPost] = useState<SelectedPost | null>(null);

  const selectPost = (post: Post) => {
    if (post.id !== selectedPost?.id || null) {
      setSelectedPost({
        id: post.id,
        title: post.title,
        body: post.body,
      });
      setIsOpened(true);
    } else {
      setSelectedPost(null);
      setIsOpened(false);
    }
  };

  const toggle = () => {
    setIsVisible(prevIsVisible => !prevIsVisible);
  };

  useEffect(() => {
    setPosts([]);

    const Posts = async () => {
      if (selectedUser) {
        setIsLoading(true);
        setIsOpened(false);
        try {
          const innerPosts = await getPosts(selectedUser?.id);

          setPosts(innerPosts);
        } catch (innerError) {
          throw new Error();
        } finally {
          setIsLoading(false);
          setSelectedPost(null);
        }
      }
    };

    Posts();
  }, [selectedUser]);

  const selectUser = (user: User) => {
    setIsVisible(false);
    setSelectedUser({
      name: user.name,
      id: user.id,
    });
  };

  useEffect(() => {
    const Users = async () => {
      try {
        const innerUsers = await getUsers();

        setUsers(innerUsers);
      } catch (innerError) {
        setError(true);
      }
    };

    Users();
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
                  isVisible={isVisible}
                  onToggle={toggle}
                  onSelectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(selectedUser === null && !error) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading
                  && <Loader />}

                {error
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                {(selectedUser !== null
                  && posts.length === 0
                  && !isLoading
                ) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {posts.length !== 0
                  && (
                    <PostsList
                      posts={posts}
                      onSelectPost={selectPost}
                      selectedPost={selectedPost}
                    />
                  )}

              </div>
            </div>
          </div>

          {isOpened && (
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
                <PostDetails
                  selectedPost={selectedPost}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

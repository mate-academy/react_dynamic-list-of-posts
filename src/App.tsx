import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isErrorPosts, setIsErrorPosts] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', toggle);
    }

    return () => {
      document.removeEventListener('click', toggle);
    };
  }, [isOpen]);

  const loadPosts = async (user: User) => {
    setSelectedPost(null);
    setIsLoading(true);
    try {
      const loadedPosts = await getPosts(user.id);

      setPosts(loadedPosts);
    } catch {
      setIsErrorPosts(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setPosts(null);
    setIsErrorPosts(false);
    setSelectedUser(user);
    loadPosts(user);
  };

  const handleSelectedPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsAddingComment(false);
    const { id } = event.currentTarget;

    const detectedPost = posts?.find(post => post.id === +id);

    if (detectedPost) {
      setSelectedPost(detectedPost);
    }

    if (detectedPost === selectedPost) {
      setSelectedPost(null);
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
                  handleSelectUser={handleSelectUser}
                  selectedUser={selectedUser}
                  toggle={toggle}
                  isOpen={isOpen}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(posts?.length === 0 && !isErrorPosts && !isLoading) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(posts && posts.length > 0) && (
                  <PostsList
                    posts={posts}
                    handleSelectedPost={handleSelectedPost}
                    selectedPost={selectedPost}
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
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isAddingComment={isAddingComment}
                  setIsAddingComment={setIsAddingComment}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

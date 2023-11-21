import React, { useCallback, useEffect, useState } from 'react';
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
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getPosts } from './api/posts';
import { getComments } from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  // const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isPostsWarning = !posts.length && selectedUser && !isLoading;
  const isPostsDisplayed = posts.length > 0 && !isLoading;

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      throw new Error();
    }
  };

  const loadPosts = useCallback(async () => {
    try {
      const data = await getPosts(selectedUser?.id);

      setPosts(data);
    } catch (error) {
      setErrorMessage('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [selectedUser]);

  const loadComments = useCallback(async () => {
    try {
      const data = await getComments(selectedPost?.id);

      setComments(data);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsCommentsLoading(false);
    }
  }, [selectedPost]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setErrorMessage('');
      loadPosts();
    }
  }, [selectedUser, loadPosts]);

  useEffect(() => {
    if (selectedPost) {
      setErrorMessage('');
      loadComments();
    }
  }, [selectedPost, loadComments]);

  const onUserSelect = (user: User) => {
    if (selectedUser !== user) {
      setIsLoading(true);
      setSelectedUser(user);
    }

    setIsDropdownMenu(false);
  };

  const onPostSelect = (post: Post) => {
    setIsCommentsLoading(true);
    setSelectedPost(selectedPost === post ? null : post);
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
                  isDisplayed={isDropdownMenu}
                  setIsDisplayed={setIsDropdownMenu}
                  onUserSelect={onUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsWarning && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isPostsDisplayed && (
                  <PostsList
                    posts={posts}
                    onPostSelect={onPostSelect}
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
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  post={selectedPost}
                  error={errorMessage}
                  isLoading={isCommentsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

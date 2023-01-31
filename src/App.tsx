/* eslint-disable no-console */
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
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { ErrorType } from './types/ErrorType';
import { Loading } from './types/Loading';
import { Comment } from './types/Comment';
import { getComments } from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState(ErrorType.None);
  const [isLoading, setLoading] = useState(Loading.None);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [usersLimit, setUsersLimit] = useState(10);

  useEffect(() => {
    getUsers(usersLimit)
      .then(setUsers);
  }, [usersLimit]);

  const loadMoreUsers = () => {
    setUsersLimit(current => current + 10);
  };

  const loadPosts = async () => {
    if (selectedUser) {
      setLoading(Loading.Posts);
      try {
        const loadedPosts = await getPosts(selectedUser.id);

        setPosts(loadedPosts);
      } catch (err) {
        setError(ErrorType.PostsLoading);
      } finally {
        setLoading(Loading.None);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUser]);

  const loadComments = async () => {
    if (selectedPost) {
      setLoading(Loading.Comments);
      try {
        const loadedComments = await getComments(selectedPost.id);

        setComments(loadedComments);
      } catch (err) {
        setError(ErrorType.CommentsLoading);
      } finally {
        setLoading(Loading.None);
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, [selectedPost]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  useEffect(() => {
    setFormOpen(false);
  }, [selectedPost, selectedUser]);

  const hasNoPosts = !posts.length
  && selectedUser
  && !error
  && !isLoading;

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
                  onSelect={handleSelectUser}
                  loadMoreUsers={loadMoreUsers}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading === Loading.Posts && <Loader />}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {error === ErrorType.PostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length > 0
                && !isLoading
                && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  error={error}
                  isLoading={isLoading}
                  comments={comments}
                  setComments={setComments}
                  isFormOpen={isFormOpen}
                  setFormOpen={setFormOpen}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

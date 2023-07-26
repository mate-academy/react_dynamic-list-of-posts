import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './services/user';
import { getUserPosts } from './services/posts';
import * as services from './services/comments';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    setErrorMessage('');
    setPosts([]);
    setSelectedPost(null);
    setComments([]);
    setIsLoading(true);
    try {
      const loadedUser = await getUsers();

      setUsers(loadedUser);
    } catch {
      setErrorMessage(ErrorType.USERS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [selectedUser]);

  const loadPosts = async (id: number) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const loadedPosts = await getUserPosts(id);

      setPosts(loadedPosts);
    } catch {
      setErrorMessage(ErrorType.POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      loadPosts(selectedUser?.id);
    }
  }, [selectedUser]);

  const loadComments = async (id: number) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const loadedComments = await services.getPostComments(id);

      setComments(loadedComments);
    } catch {
      setErrorMessage(ErrorType.COMMENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost?.id);
    }
  }, [selectedPost]);

  const deleteComment = async (commentId: number) => {
    setErrorMessage('');
    setComments(currentComments => currentComments
      .filter(({ id }) => id !== commentId));
    try {
      await services.deleteComment(commentId);
    } catch (error) {
      setComments(comments);
      setErrorMessage(ErrorType.COMM_DEL);
      throw error;
    }
  };

  const addComment = async (comment: CommentData) => {
    setErrorMessage('');
    try {
      const addedComment = await services.postComment(comment);

      setComments(currComments => [...currComments, addedComment]);
    } catch {
      setErrorMessage(ErrorType.COMM_ADD);
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !isLoading && !errorMessage && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && posts.length === 0 && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser && !posts.length
                && !isLoading && !errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
                  comments={comments}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  selectedPost={selectedPost}
                  onCommentDelete={deleteComment}
                  onCommentAdd={addComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

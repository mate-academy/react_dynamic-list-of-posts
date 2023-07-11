/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { ErrorMessage } from './types/errors';
import { Comment } from './types/Comment';
import { getComments } from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCommentsFetching, setIsCommentsFetching] = useState(false);
  const [isCommentListHidden, setIsCommentListHidden] = useState(true);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isPostlistVisible, setIsPostListVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const loadingArrayErrors = [ErrorMessage.USERS, ErrorMessage.POSTS];

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
    } catch {
      setErrorMessage(ErrorMessage.USERS);
    }
  };

  const fetchPosts = async (userId: number) => {
    setIsLoaderVisible(true);
    setIsPostListVisible(false);

    try {
      const fetchedPosts = await getPosts(userId);

      setPosts(fetchedPosts);
      setIsPostListVisible(true);
    } catch {
      setErrorMessage(ErrorMessage.POSTS);
      setIsPostListVisible(false);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  const fetchCommentsByPostId = async (postId: number) => {
    setIsCommentsFetching(true);
    setIsCommentListHidden(false);

    try {
      const fetchedComments = await getComments(postId);

      setComments(fetchedComments);
      setIsPostListVisible(true);
    } catch (error) {
      setErrorMessage(ErrorMessage.COMMENTS);
    } finally {
      setIsCommentsFetching(false);
    }
  };

  const handleOpenDetails = (post: Post) => {
    setSelectedPost(post);
    fetchCommentsByPostId(post.id);
    setIsCommentFormOpen(false);
  };

  useEffect(() => {
    fetchUsers();
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
                  selected={selectedUser}
                  onSelect={setSelectedUser}
                  getUsersPosts={fetchPosts}
                  setIsCommentsListHidden={setIsCommentListHidden}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaderVisible && (
                  <Loader />
                )}

                {errorMessage && loadingArrayErrors.includes(errorMessage) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isPostlistVisible && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    openDetails={handleOpenDetails}
                    closeCommentList={setIsCommentListHidden}
                    isCommentListHidden={isCommentListHidden}
                  />
                )}
              </div>
            </div>
          </div>

          {!isCommentListHidden && (
            <div
              data-cy="Sidebar"
              className={cn(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  errorMessage={errorMessage}
                  comments={comments}
                  setErrorMessage={setErrorMessage}
                  setComments={setComments}
                  isFetching={isCommentsFetching}
                  isCommentFormOpen={isCommentFormOpen}
                  openCommentsForm={setIsCommentFormOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

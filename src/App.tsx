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
import { ErrorTypes } from './constants';
import { getPostsByUserId } from './api/posts';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getPostComments } from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isPostlistVisible, setIsPostListVisible] = useState(false);
  const [isCommentsFetching, setIsCommentsFetching] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorType, setErrorType] = useState<ErrorTypes | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCommentsListtHidden, setIsCommentsListHidden] = useState(true);

  const loadingDataErrors = [ErrorTypes.USERS, ErrorTypes.POSTS];

  const getUsersFromServer = async () => {
    try {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
    } catch (error) {
      setErrorType(ErrorTypes.USERS);
    }
  };

  const getPostsByUserIdFromServer = async (userId: number) => {
    setIsLoaderVisible(true);
    setIsPostListVisible(false);

    try {
      const fetchedPosts = await getPostsByUserId(userId);

      setPosts(fetchedPosts);
      setIsPostListVisible(true);
    } catch (error) {
      setErrorType(ErrorTypes.POSTS);
      setIsPostListVisible(false);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  const getCommentsByPostIdFromServer = async (postId: number) => {
    setIsCommentsFetching(true);
    setIsCommentsListHidden(false);

    try {
      const fetchedComments = await getPostComments(postId);

      setComments(fetchedComments);
      setIsPostListVisible(true);
    } catch (error) {
      setErrorType(ErrorTypes.COMMENTS);
    } finally {
      setIsCommentsFetching(false);
    }
  };

  const handleOpenDetails = (post: Post) => {
    setSelectedPost(post);
    getCommentsByPostIdFromServer(post.id);
    setIsCommentFormOpen(false);
  };

  useEffect(() => {
    getUsersFromServer();
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
                  getUsersPosts={getPostsByUserIdFromServer}
                  setIsCommentsListHidden={setIsCommentsListHidden}
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

                {(errorType && loadingDataErrors.includes(errorType)) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorType}
                  </div>
                )}

                {isPostlistVisible && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    openDetails={handleOpenDetails}
                    closeCommentList={setIsCommentsListHidden}
                    isCommentsListtHidden={isCommentsListtHidden}
                  />
                )}
              </div>
            </div>
          </div>

          {!isCommentsListtHidden && (
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
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  errorType={errorType}
                  setErrorType={setErrorType}
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

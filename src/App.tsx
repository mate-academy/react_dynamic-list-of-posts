import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { customFetch } from './utils/fetchClient';
import { User } from './types/User';
import { ErrorType } from './types/ErrorType';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isErrorType, setErrorType] = useState<ErrorType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostListVisible, setIsPostListVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isCommentFetch, setIsCommentFetch] = useState(false);
  const [isCommentListHidden, setIsCommentListHidden] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpenFormForComment, setOpenFormForComment] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadingErrors = [ErrorType.USERS, ErrorType.POSTS];

  const getUsers = async () => {
    try {
      const fetchUsers = await customFetch.getUserFromServer();

      setUsers(fetchUsers as User[]);
      setErrorType(null);
    } catch (error) {
      setErrorType(ErrorType.USERS);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUserPostsFromServer = async (userId: number) => {
    setIsLoaderVisible(true);
    setIsPostListVisible(false);

    try {
      const fetchPost = await customFetch.getPostFromServer(userId);

      setErrorType(null);

      setPosts(fetchPost);
      setIsPostListVisible(true);
      setErrorType(null);
    } catch (error) {
      setErrorType(ErrorType.POSTS);
      setIsPostListVisible(false);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  const getCommentByPostFromServer = async (postId: number) => {
    setIsCommentFetch(true);
    setIsCommentListHidden(false);

    try {
      const fetchComments = await customFetch.getPostComments(postId);

      setComments(fetchComments);
      setIsPostListVisible(true);
      setErrorType(null);
    } catch (error) {
      setErrorType(ErrorType.COMMENTS);
    } finally {
      setIsCommentFetch(false);
    }
  };

  const handleOpenerDetails = (post: Post) => {
    setSelectedPost(post);
    getCommentByPostFromServer(post.id);
    setOpenFormForComment(false);
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
                  select={selectedUser}
                  onSelect={setSelectedUser}
                  getUserPosts={getUserPostsFromServer}
                  setIsCommentListHidden={setIsCommentListHidden}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaderVisible ? (
                  <Loader />
                ) : (
                  <>
                    {(isErrorType && loadingErrors.includes(isErrorType)) && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {isErrorType}
                      </div>
                    )}
                  </>
                )}

                {isPostListVisible && (
                  <PostsList
                    posts={posts}
                    selectPost={selectedPost}
                    openerDetails={handleOpenerDetails}
                    closeCommentList={setIsCommentListHidden}
                    isCommentListHiden={isCommentListHidden}
                  />
                )}

              </div>
            </div>
          </div>

          {!isCommentListHidden && (
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
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  errorType={isErrorType}
                  setErrorType={setErrorType}
                  setComments={setComments}
                  isFetch={isCommentFetch}
                  isCommentFormOpen={isOpenFormForComment}
                  openFormForComment={setOpenFormForComment}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

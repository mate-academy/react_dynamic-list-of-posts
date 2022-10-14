import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Errors } from './components/Errors/Errors';
import { ErrorMessages } from './types/Error';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState({
    isError: false,
    message: ErrorMessages.None,
  });
  const [selectedUser, setSelectedUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, seIsLoading] = useState(false);
  const [isOpenSidebar, seIsOpenSidebar] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handleError = (isError: boolean, message: ErrorMessages) => {
    setError({ isError, message });
  };

  async function loadUsers() {
    try {
      handleError(false, ErrorMessages.None);
      const getUsers = await client.get<User[]>('/users');

      setUsers(getUsers);
    } catch (e) {
      handleError(true, ErrorMessages.ErrorLoadUsers);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const showPosts = async (user: User) => {
    seIsOpenSidebar(false);
    setSelectedUser(user);
    seIsLoading(true);
    setPostComments([]);
    try {
      handleError(false, ErrorMessages.None);
      const getPosts = await client.get<Post[]>(`/posts?userId=${user.id}`);

      setPosts(getPosts);
    } catch (e) {
      handleError(true, ErrorMessages.ErrorLoasPosts);
    }

    seIsLoading(false);
  };

  const loadComments = async (post: Post) => {
    setIsLoadingComments(true);
    try {
      handleError(false, ErrorMessages.None);
      const getComments = await client.get<Comment[]>(`/comments?postId=${post.id}`);

      setPostComments(getComments);
    } catch (e) {
      handleError(true, ErrorMessages.ErrorLoadComments);
    }

    setIsLoadingComments(false);
  };

  const showPostDetails = (post: Post) => {
    if (!isOpenSidebar) {
      seIsOpenSidebar(true);
      setOpenedPost(post);
      loadComments(post);
    }

    if ((isOpenSidebar && post !== openedPost)) {
      setOpenedPost(post);
      loadComments(post);
    }

    if (isOpenSidebar && post === openedPost) {
      seIsOpenSidebar(!isOpenSidebar);
      setOpenedPost(undefined);
    }
  };

  const addComment = async (comment: {}) => {
    try {
      handleError(false, ErrorMessages.None);
      const addCommentToPost = await client.post<Comment>('/comments', comment);

      setPostComments(state => (
        [
          ...state,
          addCommentToPost,
        ]
      ));
    } catch (e) {
      handleError(true, ErrorMessages.ErrorAddComment);
    }
  };

  const deleteComment = async (id: number) => {
    const findComment = postComments.find(comment => comment.id === id);

    if (!findComment) {
      return;
    }

    try {
      handleError(false, ErrorMessages.None);

      setPostComments(state => (
        state.filter(comment => comment.id !== id)
      ));

      await client.delete(`/comments/${id}`);
    } catch (e) {
      handleError(true, ErrorMessages.ErrorDeleteComment);
      setPostComments(state => (
        [
          ...state,
          findComment,
        ]
      ));
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
                  showPosts={showPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {(error.isError
                  && error.message !== ErrorMessages.ErrorLoadComments)
                  && <Errors error={error} />}

                {(selectedUser && posts.length === 0
                && !isLoading && !error.isError) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(selectedUser && posts.length !== 0 && !isLoading) && (
                  <PostsList
                    posts={posts}
                    showPostDetails={showPostDetails}
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
              { 'Sidebar--open': isOpenSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              {openedPost && (
                <PostDetails
                  post={openedPost}
                  comments={postComments}
                  isLoadingComments={isLoadingComments}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

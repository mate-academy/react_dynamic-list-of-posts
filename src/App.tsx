import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  getUsers,
  getUserPosts,
  getPostComments,
  createComment,
  deleteComment,
} from './api/Users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentsError, setCommentsError] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  function clearSidebar() {
    setIsError(false);
    setCommentsError(false);
    setIsNewCommentForm(false);
  }

  const loadUsers = async () => {
    try {
      clearSidebar();
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  const loadUserPosts = async (userId: number) => {
    try {
      setIsLoading(true);
      setActivePost(null);
      clearSidebar();
      const posts = await getUserPosts(userId);

      setUserPosts(posts);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async (postId: number) => {
    try {
      clearSidebar();
      const comments = await getPostComments(postId);

      setPostComments(comments);
    } catch (error) {
      setCommentsError(true);
    }
  };

  const postComment = async (data: Omit<Comment, 'id'>) => {
    try {
      setIsCommentLoading(true);
      const newComment = await createComment(data);

      setPostComments(comments => {
        return (
          comments !== null ? ([
            ...comments,
            newComment,
          ]) : (
            [newComment]
          ));
      });
    } catch (error) {
      setCommentsError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const removeComment = async (id: number) => {
    try {
      if (postComments !== null) {
        const comments = postComments.filter(
          comment => comment.id !== id,
        );

        setPostComments([...comments]);
        await deleteComment(id);
      }
    } catch (error) {
      setCommentsError(true);
    }
  };

  const handleSideBar = (
    post: Post,
  ) => {
    if (post.id !== activePost?.id) {
      setPostComments(null);
      loadComments(post.id);
    }

    setActivePost(value => (
      value?.id === post.id ? null : post
    ));
  };

  useEffect(() => {
    loadUsers();
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
                  loadUserPosts={loadUserPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {userPosts === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(userPosts !== null && !userPosts?.length) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!userPosts?.length && (
                  <PostsList
                    userPosts={userPosts}
                    activePost={activePost}
                    handleSideBar={handleSideBar}
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
              { 'Sidebar--open': activePost },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails
                  activePost={activePost}
                  postComments={postComments}
                  isCommentsError={isCommentsError}
                  isNewCommentForm={isNewCommentForm}
                  setIsNewCommentForm={setIsNewCommentForm}
                  postComment={postComment}
                  isCommentLoading={isCommentLoading}
                  removeComment={removeComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

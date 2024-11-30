/* eslint-disable @typescript-eslint/indent */

import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useEffect, useState } from 'react';

import { UserSelector } from './components/UserSelector';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader';
import { Comment, CommentData } from './types/Comment';
import { User } from './types/User';
import { Post } from './types/Post';
import {
  addNewComment,
  deleteComment,
  getUserPostComments,
  getUserPosts,
  getUsers,
} from './api/post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [showPostLoader, setShowPostLoader] = useState<boolean>(false);
  const [showCommentLoader, setShowCommentLoader] = useState<boolean>(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [hasPostError, setHasPostError] = useState<boolean>(false);
  const [hasCommentError, setHasCommentError] = useState<boolean>(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res as User[]);
      })
      .catch(() => new Error('Failed to fetch users'));
  }, []);

  const fetchUserPosts = (user: User) => {
    setShowPostLoader(true);
    getUserPosts(user.id)
      .then(res => {
        setUserPosts(res as Post[]);
        setHasPostError(false);
      })
      .catch(() => {
        setHasPostError(true);
      })
      .finally(() => {
        setShowPostLoader(false);
      });
  };

  const fetchPostComments = (currentPost: Post) => {
    setIsSidebarVisible(currentPost.id);
    setShowCommentLoader(true);

    setSelectedPost(currentPost);

    getUserPostComments(currentPost.id)
      .then(res => {
        setPostComments(res as Comment[]);
        setHasCommentError(false);
      })
      .catch(() => {
        setHasCommentError(true);
      })
      .finally(() => {
        setShowCommentLoader(false);
      });
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setPostComments(prevPostComments =>
          prevPostComments.filter(
            (comment: Comment) => comment.id !== commentId,
          ),
        );
      })
      .catch(() => new Error('Failed to delete comment'));
  };

  const createComment = (newComment: CommentData) => {
    setIsAddingComment(true);
    addNewComment(newComment)
      .then(res => {
        setPostComments([...postComments, res as Comment]);
        setIsAddingComment(false);
      })
      .catch(() => new Error('Failed to add comment'));
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
                  setUserSelected={setUserSelected}
                  userSelected={userSelected}
                  handleUserPosts={fetchUserPosts}
                  setShowSideBar={setIsSidebarVisible}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showPostLoader && <Loader />}

                {hasPostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts.length > 0 && !showPostLoader && (
                  <PostsList
                    userPosts={userPosts}
                    handleShowComment={fetchPostComments}
                    showSideBar={isSidebarVisible}
                    setShowSideBar={setIsSidebarVisible}
                    setShowCommentForm={setIsCommentFormVisible}
                  />
                )}
                {userSelected &&
                  userPosts.length === 0 &&
                  !showPostLoader &&
                  !hasPostError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
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
              { 'Sidebar--open': isSidebarVisible },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                isCommentLoading={showCommentLoader}
                postComments={postComments}
                selectedPost={selectedPost}
                errorsComment={hasCommentError}
                onDeleteComment={removeComment}
                onAddComment={createComment}
                isButtonAddLoading={isAddingComment}
                onShowCommentFormChange={setIsCommentFormVisible}
                isCommentFormVisible={isCommentFormVisible}
                userSelected={userSelected}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

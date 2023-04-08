import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getAllUsers } from './api/users';
import { User } from './types/User';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { getPostComments, addNewComment, deleteComment } from './api/comments';

const tempUser = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

const tempPost = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
};

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>(tempUser);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostLoadingError, setIsPostLoadingError] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post>(tempPost);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isCommentLoadingError, setIsCommentLoadingError] = useState(false);
  const [isNoComments, setIsNoComments] = useState(false);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);

  const loadUsers = async () => {
    const loadedUsers = await getAllUsers();

    if (loadedUsers) {
      setUsers(loadedUsers);
    }
  };

  const loadUserPosts = async (userId: number) => {
    setUserPosts([]);

    try {
      const loadedUserPosts = await getUserPosts(userId);

      if (loadedUserPosts.length !== 0) {
        setIsPostLoading(false);
        setUserPosts(loadedUserPosts);
      } else {
        setIsPostLoading(false);
        setIsNoPosts(true);
      }
    } catch {
      setIsPostLoading(false);
      setIsPostLoadingError(true);
      setUserPosts([]);
    }
  };

  const loadPostComments = async (postId: number) => {
    try {
      const loadedPostComments = await getPostComments(postId);

      if (loadedPostComments.length !== 0) {
        setIsCommentLoading(false);
        setPostComments(loadedPostComments);
      } else {
        setIsCommentLoading(false);
        setIsNoComments(true);
      }
    } catch {
      setIsCommentLoading(false);
      setIsCommentLoadingError(true);
    }
  };

  const addComment = async (
    newComment: CommentData,
    offButtonLoad: (status: boolean) => void,
    clearText: () => void,
  ) => {
    try {
      const addedComment = await addNewComment({
        postId: openedPost.id,
        ...newComment,
      });

      if (addedComment) {
        setPostComments((state) => {
          return [...state, addedComment];
        });
        loadPostComments(openedPost.id);
        offButtonLoad(false);
        clearText();
      }
    } catch {
      offButtonLoad(false);
      setIsCommentLoadingError(true);
    }
  };

  const commentDelete = async (commentId: number, setDeleteId: () => void) => {
    try {
      const deletedComment = await deleteComment(commentId);

      if (deletedComment) {
        setPostComments(state => {
          return state.filter(comment => comment.id !== commentId);
        });
        loadPostComments(openedPost.id);
        setDeleteId();
      }
    } catch {
      setIsCommentLoadingError(true);
    }
  };

  const selectUser = (
    user: User,
    setIsChoosing: (isChoosing: boolean) => void,
  ) => {
    setIsNoPosts(false);
    setIsPostLoadingError(false);
    setSelectedUser(user);
    setIsChoosing(false);
    setOpenedPost(tempPost);
    loadUserPosts(user.id);
    setIsPostLoading(true);
  };

  const onOpenPost = (post: Post) => {
    setPostComments([]);
    setIsNoComments(false);
    setIsCommentLoadingError(false);
    setIsNewCommentForm(false);

    if (post.id === openedPost.id) {
      setOpenedPost(tempPost);
    } else {
      setOpenedPost(post);
      loadPostComments(post.id);
      setIsCommentLoading(true);
    }
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
                  selectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser.id === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostLoading && <Loader />}

                {isPostLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {isNoPosts && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!isPostLoadingError && userPosts.length !== 0 && (
                  <PostsList
                    userPosts={userPosts}
                    onOpenPost={onOpenPost}
                    openedPost={openedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {userPosts.length !== 0 && openedPost.id !== 0 && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  openedPost={openedPost}
                  postComments={postComments}
                  isCommentLoading={isCommentLoading}
                  isCommentLoadingError={isCommentLoadingError}
                  isNoComments={isNoComments}
                  setIsNewCommentForm={setIsNewCommentForm}
                  isNewCommentForm={isNewCommentForm}
                  addComment={addComment}
                  commentDelete={commentDelete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

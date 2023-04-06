import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';
import {
  getPosts,
  getUsers,
  getComments,
  postComment,
  deleteComment,
} from './api/post';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUsersLoadingError, setIsUsersLoadingError] = useState(false);
  const [isPostsLoadingError, setIsPostsLoadingError] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadComments, setLoadComments] = useState<Comment[]>([]);
  const [isCommentsLoadError, setIsCommentsLoadError] = useState(false);
  const [isNoComments, setIsNoComments] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isCommentsUpdateError, setIsCommentsUpdateError] = useState(false);
  const [isNewCommentLoad, setIsNewCommentLoad] = useState(false);
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await getUsers();

        setUsers(usersList);
      } catch {
        setIsUsersLoadingError(true);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    setIsNoPosts(true);
    setSelectedPost(null);
    setIsPostsLoadingError(false);

    try {
      const postList = await getPosts(user?.id);

      setPosts(postList);
    } catch {
      setIsPostsLoadingError(true);
    } finally {
      setIsNoPosts(false);
    }
  };

  const handleSelectPost = useCallback(async (post: Post | null) => {
    setSelectedPost(post);
    setIsNoComments(true);
    setIsShowForm(false);
    setIsShowButton(false);
    setIsCommentsUpdateError(false);
    setIsCommentDeleteError(false);

    if (post) {
      try {
        const loadUserPost = await getComments(post.id);

        setLoadComments(loadUserPost);
      } catch {
        setIsCommentsLoadError(true);
      } finally {
        setIsNoComments(false);
      }
    }
  }, [selectedPost]);

  const handleAddComment = useCallback(async (
    name: string,
    email: string,
    body: string,
  ) => {
    setIsNewCommentLoad(true);
    setIsCommentDeleteError(false);
    const newComment = {
      postId: selectedPost?.id,
      name,
      email,
      body,
    };

    try {
      const postNewComment = await postComment(newComment);

      setIsCommentsUpdateError(false);

      setLoadComments((comments) => {
        return comments
          ? [...comments, postNewComment]
          : [postNewComment];
      });
    } catch {
      setIsCommentsUpdateError(true);
    } finally {
      setIsNewCommentLoad(false);
    }
  }, [loadComments]);

  const handleDeleteComment = (commentId: number) => {
    setIsCommentDeleteError(false);
    const prevComments = [...loadComments];

    setLoadComments(allComments => (
      allComments?.filter(comment => comment.id !== commentId)));

    deleteComment(commentId)
      .then()
      .catch(() => {
        setLoadComments(prevComments);
        setIsCommentDeleteError(true);
      });
  };

  const handleButtonForm = () => {
    setIsShowForm(true);
    setIsShowButton(true);
    setIsCommentDeleteError(false);
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
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isNoPosts && (
                  <Loader />
                )}

                {isPostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isPostsLoadingError
                  && selectedUser
                  && !isNoPosts
                  && (
                    <PostsList
                      posts={posts}
                      onSelectPost={handleSelectPost}
                      selectedPostId={selectedPost?.id}
                    />
                  )}

                {isUsersLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Unable to load users!
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={loadComments}
                  isCommentsLoadError={isCommentsLoadError}
                  isNoComments={isNoComments}
                  onButtonForm={handleButtonForm}
                  isShowForm={isShowForm}
                  isShowButton={isShowButton}
                  onAddComment={handleAddComment}
                  isCommentsUpdateError={isCommentsUpdateError}
                  setIsCommentsUpdateError={setIsCommentsUpdateError}
                  isNewCommentLoad={isNewCommentLoad}
                  onDeleteComment={handleDeleteComment}
                  isCommentDeleteError={isCommentDeleteError}
                  setIsCommentDeleteError={setIsCommentDeleteError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

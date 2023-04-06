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
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadComments, setLoadComments] = useState<Comment[]>([]);
  const [isCommentsLoad, setIsCommentsLoad] = useState(false);
  const [isNoComments, setIsNoComments] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isCommentsUpdate, setIsCommentsUpdate] = useState(false);
  const [isNewCommentLoad, setIsNewCommentLoad] = useState(false);
  const [isCommentDelete, setIsCommentDelete] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await getUsers();

        setUsers(usersList);
      } catch {
        setIsUsersLoading(true);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = async (userId: number, userName: string) => {
    setSelectedUser(userId);
    setSelectedUserName(userName);
    setIsNoPosts(true);
    setSelectedPost(null);
    setIsPostsLoading(false);

    try {
      const postList = await getPosts(userId);

      setPosts(postList);
    } catch {
      setIsPostsLoading(true);
    } finally {
      setIsNoPosts(false);
    }
  };

  const handleSelectPost = useCallback(async (post: Post | null) => {
    setSelectedPost(post);
    setIsNoComments(true);
    setIsShowForm(false);
    setIsShowButton(false);
    setIsCommentsUpdate(false);
    setIsCommentDelete(false);

    if (post) {
      try {
        const loadUserPost = await getComments(post.id);

        setLoadComments(loadUserPost);
      } catch {
        setIsCommentsLoad(true);
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
    setIsCommentDelete(false);
    const newComment = {
      postId: selectedPost?.id,
      name,
      email,
      body,
    };

    try {
      const postNewComment = await postComment(newComment);

      setIsCommentsUpdate(false);

      setLoadComments((comments) => {
        return comments
          ? [...comments, postNewComment]
          : [postNewComment];
      });
    } catch {
      setIsCommentsUpdate(true);
    } finally {
      setIsNewCommentLoad(false);
    }
  }, [loadComments]);

  const handleDeleteComment = (commentId: number) => {
    setIsCommentDelete(false);
    const prevComments = [...loadComments];

    setLoadComments(allComments => (
      allComments?.filter(comment => comment.id !== commentId)));

    deleteComment(commentId)
      .then()
      .catch(() => {
        setLoadComments(prevComments);
        setIsCommentDelete(true);
      });
  };

  const handleButtonForm = () => {
    setIsShowForm(true);
    setIsShowButton(true);
    setIsCommentDelete(false);
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
                  selectedUserName={selectedUserName}
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

                {isPostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isPostsLoading
                  && selectedUser
                  && !isNoPosts
                  && (
                    <PostsList
                      posts={posts}
                      onSelectPost={handleSelectPost}
                      selectedPostId={selectedPost?.id}
                    />
                  )}

                {isUsersLoading && (
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
                  isCommentsLoad={isCommentsLoad}
                  isNoComments={isNoComments}
                  onButtonForm={handleButtonForm}
                  isShowForm={isShowForm}
                  isShowButton={isShowButton}
                  onAddComment={handleAddComment}
                  isCommentsUpdate={isCommentsUpdate}
                  setIsCommentsUpdate={setIsCommentsUpdate}
                  isNewCommentLoad={isNewCommentLoad}
                  onDeleteComment={handleDeleteComment}
                  isCommentDelete={isCommentDelete}
                  setIsCommentDelete={setIsCommentDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

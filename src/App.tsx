import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import {
  addComment,
  deleteComment,
  getUsers,
  getUsersComments,
  getUsersPosts,
} from './api/api';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentError, setisCommentError] = useState(false);
  const [canWriteComment, setCanWriteComment] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const getUserPostFromServer = (userId: number) => {
    setIsLoading(true);

    getUsersPosts(userId)
      .then((data) => {
        setUserPosts(data);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const getCommentsFromServer = (postId: number) => {
    setIsCommentLoading(true);

    getUsersComments(postId)
      .then((data) => {
        setComments(data);
        setisCommentError(false);
      })
      .catch(() => setisCommentError(true))
      .finally(() => {
        setIsLoading(false);
        setIsCommentLoading(false);
      });
  };

  const handleUserSelect = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();

    getUserPostFromServer(user.id);
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost((currentPost) => {
      if (currentPost?.id === post.id) {
        return null;
      }

      return post;
    });

    getCommentsFromServer(post.id);
    setCanWriteComment(false);
  };

  const handleAddNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    const newComment = await addComment(postId, name, email, body);

    const filteredComments
      = comments.filter((currentComment) => {
        return selectedPost?.id === currentComment.postId;
      });

    setComments([...filteredComments, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    const filteredComments
      = comments.filter(currentComment => {
        return currentComment.id !== commentId;
      });

    setComments(filteredComments);
    deleteComment(commentId);
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
                  handleSelectUser={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!userPosts.length
                  && selectedUser
                  && !isLoading
                  && !isError
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {userPosts.length > 0 && !isLoading && (
                  <PostsList
                    handleSelectPost={handleSelectPost}
                    posts={userPosts}
                    selectedPost={selectedPost}
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
              'Sidebar', {
                'Sidebar--open': selectedUser,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isCommentError={isCommentError}
                  isCommentsLoading={isCommentLoading}
                  handleAddComment={handleAddNewComment}
                  handleDelete={handleDeleteComment}
                  canWriteAComment={canWriteComment}
                  setCanWriteAComment={setCanWriteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

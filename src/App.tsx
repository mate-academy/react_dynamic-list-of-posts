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
  getUsers,
  getPosts,
  getComments,
  addComment,
  deleteComment,
} from './api/users';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { NewComment } from './types/NewComment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoadingError, setIsPostsLoadingError]
    = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsError, setIsCommentsError] = useState<boolean>(false);
  const [areCommentsLoading, setAreCommentsLoading] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then((result) => setUsers(result));
  }, []);

  const selectUser = (user: User) => {
    if (selectedUser) {
      setSelectedUser(undefined);
      setPosts([]);
    }

    setIsUserLoading(true);
    setSelectedUser(user);
    setSelectedPost(undefined);

    getPosts(user.id)
      .then((result) => setPosts(result))
      .catch(() => setIsPostsLoadingError(true))
      .finally(() => setIsUserLoading(false));
  };

  const getPostComments = (post: Post) => {
    if (post === selectedPost) {
      setSelectedPost(undefined);
    } else {
      setSelectedPost(post);
      setAreCommentsLoading(true);
      getComments(post.id)
        .then((result) => setComments(result))
        .catch(() => setIsCommentsError(true))
        .finally(() => setAreCommentsLoading(false));
    }
  };

  const addNewComment = (comment: NewComment, postId: number) => {
    return addComment(comment, postId)
      .then(() => getComments(postId)
        .then((result) => setComments(result)));
  };

  const removeCommentFromList = (commentId: number) => {
    setComments(comments.filter(comment => commentId !== comment.id));
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
                  selectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isUserLoading && <Loader />}

                {isPostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(selectedUser && posts.length > 0) && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    getPostComments={getPostComments}
                  />
                )}

                {(selectedUser && !posts.length && !isUserLoading) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments}
                commentsError={isCommentsError}
                commentsAreLoading={areCommentsLoading}
                addNewComment={addNewComment}
                removeCommentFromList={removeCommentFromList}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

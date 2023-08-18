import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';

import { Loader } from './components/Loader';
import { User } from './types/User';
import { getAllUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { addComment, deleteCommentById, getCommentById } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [selectPost, setSelectPost] = useState<Post | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then(setUsers)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [setUsers]);

  useEffect(() => {
    setIsLoading(true);
    if (selectUser) {
      getPosts(selectUser.id)
        .then(setPosts)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [selectUser?.id]);

  useEffect(() => {
    if (selectPost !== null) {
      getCommentById(selectPost.id)
        .then(setComments)
        .catch(() => setError('No posts yet'));
    }
  }, [selectPost?.id]);

  const deleteComment = (commentId: number) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(() => setError('Can not delete comment'));
  };

  const addComments = (newComment: Omit<Comment, 'id'>) => {
    setIsLoading(true);
    const commentId = Math.random();

    const commentWithId: Comment = {
      id: commentId,
      ...newComment,
    };

    addComment(commentWithId)
      .then(() => {
        setComments(prev => [...prev, commentWithId]);
      })
      .catch(() => setError('Can not add comment'))
      .finally(() => setIsLoading(false));
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
                  setSelectUser={setSelectUser}
                  setSelectPost={setSelectPost}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isLoading && (<Loader />)}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}
                {!posts.length && !isLoading && selectUser ? (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectPost={selectPost}
                    setSelectPost={setSelectPost}
                    selectUser={selectUser}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar', { 'Sidebar--open': selectPost && posts.length > 0 },
            )}
          >
            {selectPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  selectPost={selectPost}
                  error={error}
                  deleteComment={deleteComment}
                  addComments={addComments}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

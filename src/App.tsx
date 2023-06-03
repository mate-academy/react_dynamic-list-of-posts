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
  getPosts, getUsers, getComments, addComment, deleteComment,
} from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';
import { CommentData, Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostsLoading, setArePostLoading] = useState(false);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    getUsers('/users')
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const searchedUrl = `/posts?userId=${selectedUserId}`;

      setArePostLoading(true);
      getPosts(searchedUrl)
        .then((userPosts) => {
          setPosts(userPosts);
          setPostsError(false);
        })
        .catch(() => setPostsError(true))
        .finally(() => setArePostLoading(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId) {
      const searchedUrl = `/comments?postId=${selectedPostId}`;

      setAreCommentsLoading(true);
      getComments(searchedUrl)
        .then((chosenPostComment) => {
          setComments(chosenPostComment);
          setCommentsError(false);
        })
        .catch(() => setCommentsError(true))
        .finally(() => setAreCommentsLoading(false));
    }
  }, [selectedPostId]);

  const handleUserIdSelection = (id: number) => {
    setSelectedUserId(id);
  };

  const handlePostIdSelection = (id: number) => {
    setSelectedPostId(id);
  };

  const handleCommentAdd = (comment: CommentData) => {
    const newComment = {
      ...comment,
      postId: selectedPostId,
      id: Math.max(...comments.map(com => com.id)) + 1,
    };

    return addComment('/comments', newComment)
      .then(() => setComments(prevComments => (
        [...prevComments, newComment]
      )));
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));

    const searchedUrl = `/comments/${commentId}`;

    deleteComment(searchedUrl);
  };

  const chosenPost = posts.find(post => post.id === selectedPostId) || null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserIdSelection={handleUserIdSelection}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {arePostsLoading ? (
                  <Loader />
                ) : (
                  <>
                    {postsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {Boolean(posts.length) && (
                      <PostsList
                        posts={posts}
                        onPostIdSelection={handlePostIdSelection}
                      />
                    )}

                    {Boolean(!posts.length && selectedUserId) && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
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
              { 'Sidebar--open': posts.length && selectedPostId },
            )}
          >

            <div className="tile is-child box is-success ">
              {chosenPost && (
                <PostDetails
                  post={chosenPost}
                  comments={comments}
                  commentsError={commentsError}
                  areCommentsLoading={areCommentsLoading}
                  onCommentAdd={handleCommentAdd}
                  onCommentDelete={handleCommentDelete}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

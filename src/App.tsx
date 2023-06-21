import React, { useState, useEffect } from 'react';
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
import { Comment, CommentData } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  useEffect(() => {
    getUsers('/users')
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const serchedUrl = `/posts?userId=${selectedUserId}`;

      setPostsLoading(true);
      getPosts(serchedUrl)
        .then((userPosts: Post[]) => {
          setPosts(userPosts);
          setPostError(false);
        })
        .catch(() => setPostError(true))
        .finally(() => setPostsLoading(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId) {
      const searchedUrl = `/comments?postId=${selectedPostId}`;

      setCommentsLoading(true);
      getComments(searchedUrl)
        .then((chosenPostComment) => {
          setComments(chosenPostComment);
          setCommentError(false);
        })
        .catch(() => setCommentError(true))
        .finally(() => setCommentsLoading(false));
    }
  }, [selectedPostId]);

  const handleUserSelected = (id: number) => {
    setSelectedUserId(id);
  };

  const handlePostSelected = (id: number) => {
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

  const selectPost = posts.find(post => post.id === selectedPostId) || null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userIdSelected={handleUserSelected}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postsLoading ? (
                  <Loader />
                ) : (
                  <>
                    {postError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        postIdSelected={handlePostSelected}
                      />
                    )}

                    {!posts.length && selectedUserId && (
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
              {selectPost && (
                <PostDetails
                  post={selectPost}
                  comments={comments}
                  commentsError={commentError}
                  commentsLoading={commentsLoading}
                  commentAdd={handleCommentAdd}
                  commentDelete={handleCommentDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

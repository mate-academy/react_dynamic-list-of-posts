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
import * as postService from './api/users';
import { getPostsByUserId } from './api/posts';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import * as commentService from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsErrorMessage, setPostsErrorMessage] = useState('');

  const [comments, setComments] = useState<Comment[] | []>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsErrorMessage, setCommentsErrorMessage] = useState('');

  const [isNewCommentFormOpened, setIsNewCommentFormOpened] = useState(false);

  const hasNoPosts =
    !loadingPosts && selectedUser && !posts.length && !postsErrorMessage;

  const getNewCommentId = (currentComments: Comment[]) => {
    const maxId = Math.max(...currentComments.map(comment => comment.id));

    return maxId + 1;
  };

  const addComment = ({ id, ...data }: Comment) => {
    setLoadingComments(true);

    const newCommentId = getNewCommentId(comments);

    return commentService
      .postComment({
        id: newCommentId,
        ...data,
      })
      .then(newComment =>
        setComments(currentComments => [...currentComments, newComment]),
      )
      .finally(() => setLoadingComments(false));
  };

  const deleteComment = (id: number) => {
    commentService.deleteComment(id).then(() => {
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== id),
      );
    });
  };

  useEffect(() => {
    postService.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);
      getPostsByUserId(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setPostsErrorMessage('Unable to load posts');
        })
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setLoadingComments(true);
      commentService
        .getCommentsByPostId(selectedPost.id)
        .then(setComments)
        .catch(() => {
          setCommentsErrorMessage('Unable to load comments');
        })
        .finally(() => setLoadingComments(false));
    }
  }, [selectedPost]);

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
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {!loadingPosts && postsErrorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loadingPosts && !!posts.length && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsNewCommentFormOpened={setIsNewCommentFormOpened}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {!loadingPosts && selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  commentsErrorMessage={commentsErrorMessage}
                  loadingComments={loadingComments}
                  isNewCommentFormOpened={isNewCommentFormOpened}
                  setIsNewCommentFormOpened={setIsNewCommentFormOpened}
                  onSubmit={addComment}
                  onDelete={deleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import * as servise from './servises';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [postsFromServer, setPostsFromServer] = useState<Post[]>();
  const [commentsFromServer, setCommentsFromServer] = useState<Comment[]>();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();
  const [error, setError] = useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    servise
      .getUsers()
      .then(setUsersFromServer)
      .catch(() => {
        setError('enable to load users');
        throw new Error('enable to load users');
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setPostsFromServer([]);
      setSelectedPost(undefined);
      setLoadingPosts(true);

      servise
        .getPosts(selectedUser.id)
        .then(setPostsFromServer)
        .catch(() => {
          // setSelectedUser(undefined);
          setError('Something went wrong!');
        })
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    setCommentsFromServer(undefined);
    setIsWritingComment(false);

    if (selectedPost) {
      setLoadingComments(true);

      servise
        .getComments(selectedPost.id)
        .then(comments => {
          setCommentsFromServer(comments.sort((a, b) => a.id - b.id));
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => setLoadingComments(false));
    }
  }, [selectedPost]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDeleteComment = async (commentId: number) => {
    setCommentsFromServer(prev =>
      prev ? prev.filter(c => c.id !== commentId) : prev,
    );

    return servise.deleteComment(commentId).catch(() => {
      setCommentsFromServer(commentsFromServer);
      setError('Failed to delete comment');
    });
  };

  const handleAddComment = (
    newCommentData: Omit<Comment, 'id'>,
  ): Promise<void> => {
    return servise
      .createComment(newCommentData)
      .then(createdComment => {
        setCommentsFromServer(prev =>
          prev ? [...prev, createdComment] : [createdComment],
        );
      })
      .catch(() => setError('Failed to create comment'));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFromServer}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {error === 'Something went wrong!' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postsFromServer && postsFromServer.length > 0 && (
                  <PostsList
                    posts={postsFromServer}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsWritingComment={setIsWritingComment}
                  />
                )}
                {postsFromServer &&
                  !loadingPosts &&
                  !error &&
                  postsFromServer.length === 0 && (
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
              {
                'Sidebar--open':
                  selectedPost &&
                  selectedUser &&
                  selectedPost.userId === selectedUser.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  loading={loadingComments}
                  comments={commentsFromServer}
                  error={error}
                  isWritingComment={isWritingComment}
                  setIsWritingComment={setIsWritingComment}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

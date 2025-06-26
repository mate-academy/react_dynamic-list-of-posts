/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import {
  addComment,
  deleteComment,
  getComments,
  getPosts,
  getUsers,
} from './api/api';

export const App = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [error, setError] = useState<string>('');
  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handleUserSelect = (userId: number) => {
    const wantedUser = userList.find(user => user.id === userId) || null;

    setSelectedUser(wantedUser);

    setUsersPosts([]);
    setIsLoadingPosts(true);
    setSelectedPost(null);
    setComments([]);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      getComments(selectedPost!.id).then(setComments);
      setCommentsError('Unable to delete a comment');
    });
  };

  const handleAddComment = (commentData: CommentData & { postId: number }) => {
    return addComment(commentData)
      .then(newComment => {
        setComments([...comments, newComment]);
      })
      .catch(() => {
        setCommentsError('Unable to add a comment');
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(setUserList)
      .catch(() => {
        setError('Unable to load users');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setIsLoadingPosts(true);
    setPostsError('');
    getPosts(selectedUser.id)
      .then(setUsersPosts)
      .catch(() => setPostsError('Something went wrong'))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost === null) {
      setComments([]);

      return;
    }

    setIsLoadingComments(true);
    setCommentsError('');

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setCommentsError('Something went wrong'))
      .finally(() => setIsLoadingComments(false));
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userList={userList}
                  selectedUser={selectedUser}
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {!isLoading && !error && (
                  <>
                    {!selectedUser && (
                      <p data-cy="NoSelectedUser">No user selected</p>
                    )}

                    {selectedUser && isLoadingPosts && <Loader />}

                    {selectedUser && postsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {postsError}
                      </div>
                    )}

                    {selectedUser &&
                      !isLoadingPosts &&
                      !postsError &&
                      usersPosts.length === 0 && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )}

                    {selectedUser &&
                      !isLoadingPosts &&
                      !postsError &&
                      usersPosts.length > 0 && (
                        <PostsList
                          posts={usersPosts}
                          selectedPost={selectedPost}
                          setSelectedPost={setSelectedPost}
                        />
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsError={commentsError}
                  onDelete={handleDeleteComment}
                  onAddComment={handleAddComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

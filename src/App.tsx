/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as usersService from './api/users';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { LoaderState } from './types/LoaderState';
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loaderPost, setLoaderPost] = useState<LoaderState>('initial');
  const [loaderComment, setLoaderComment] = useState<LoaderState>('initial');

  const [errorMessagePost, setErrorMessagePost] = useState<string | null>(null);
  const [errorMessageComment, setErrorMessageComment] = useState<string | null>(
    null,
  );

  const [isOpenComment, setIsOpenComment] = useState(false);

  function loadUsers() {
    usersService.getUsers().then(usersAPI => setUsers(usersAPI));
  }

  function loadPosts(userId: number) {
    setLoaderPost('loading');
    client
      .get<Post[]>(`/posts?userId=${userId}`)
      .then(postsAPI => {
        setPosts(postsAPI);
        setErrorMessagePost(null);
      })
      .catch(() => setErrorMessagePost('Something went wrong!'))
      .finally(() => {
        setLoaderPost('loaded');
      });
  }

  function loadComments(postId: number) {
    setLoaderComment('loading');

    client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(commentsAPI => {
        setComments(commentsAPI);
        setErrorMessageComment(null);
      })
      .catch(() => setErrorMessageComment('Something went wrong'))
      .finally(() => {
        setLoaderComment('loaded');
      });
  }

  function addComment({ postId, name, email, body }: Omit<Comment, 'id'>) {
    return client
      .post<Comment>('/comments', { postId, name, email, body })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => {})
      .finally(() => {});
  }

  function deleteComment(commentId: number) {
    setComments(prev => prev.filter(c => c.id !== commentId));

    return client
      .delete(`/comments/${commentId}`)
      .then(() => {
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setComments(comments))
      .finally(() => {});
  }

  useEffect(loadUsers, []);
  useEffect(() => {
    if (selectedUser) {
      loadPosts(selectedUser.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const showNoPosts =
    !errorMessagePost &&
    loaderPost === 'loaded' &&
    posts.length === 0 &&
    selectedUser;

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

                {loaderPost === 'loading' && <Loader />}

                {errorMessagePost && loaderPost === 'loaded' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessagePost}
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!errorMessagePost &&
                  loaderPost === 'loaded' &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      setSelectedPost={setSelectedPost}
                      loadComments={loadComments}
                      selectedPost={selectedPost}
                      setComments={setComments}
                      setIsOpenComment={setIsOpenComment}
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
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  comments={comments}
                  loaderComment={loaderComment}
                  errorMessageComment={errorMessageComment}
                  onSubmit={addComment}
                  selectedPost={selectedPost}
                  deleteComment={deleteComment}
                  isOpenComment={isOpenComment}
                  setIsOpenComment={setIsOpenComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { createContext, useEffect, useState } from 'react';
import { User } from './types/User';
import {
  deleteComment,
  getPosts,
  getSelectedPostComments,
  getUsers,
  postComment,
} from './api/data';
import { Notification } from './components/Notification/Notification';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const OpenPostContext = createContext<Post | null>(null);

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [isOpenAddComment, setIsOpenAddComment] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        const preperUsers = usersFromServer.map(person => ({
          id: person.id,
          name: person.name,
          email: person.email,
          phone: person.phone,
        }));

        setUsers(preperUsers);
      })
      .catch(() => setErrorMessage('users'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const idTimeOut = setTimeout(() => {
      if (errorMessage === 'posts') {
        setSelectedUser(null);
      }

      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(idTimeOut);
  }, [errorMessage]);

  const addComment = (name: string, email: string, body: string) => {
    if (!openPost?.id) {
      return;
    }

    const postId = openPost?.id;

    const newComment: CommentData = {
      name,
      email,
      body,
      postId,
    };

    setLoading('addComment');

    postComment(newComment)
      .then(data => {
        setComments(prevComments => [...prevComments, data]);
      })
      .catch(() => setErrorMessage('addComment'))
      .finally(() => setLoading(''));
  };

  const handleSelectUser = (selectedUserId: number) => {
    setOpenPost(null);
    setSelectedUser(selectedUserId);
    setErrorMessage('');
    setLoading('posts');
    setPosts([]);
    getPosts(selectedUserId)
      .then(data => {
        setPosts(data);
      })
      .catch(() => setErrorMessage('posts'))
      .finally(() => setLoading(''));
  };

  const handleOpenPost = (postId: number) => {
    const findPost = posts.find(post => post.id === postId);

    setIsOpenAddComment(false);
    if (findPost?.id !== openPost?.id && findPost) {
      setOpenPost(findPost);
      setLoading('comments');
      setErrorMessage('');

      getSelectedPostComments(postId)
        .then(com => setComments(com))
        .catch(() => setErrorMessage('comments'))
        .finally(() => setLoading(''));
    } else {
      setOpenPost(null);
    }
  };

  const delComment = (id: number) => {
    const copyComment = [...comments];

    setComments(prevComments =>
      [...prevComments].filter(comment => comment.id !== id),
    );

    deleteComment(id).catch(() => {
      setComments(copyComment);
      setErrorMessage('delete');
    });
  };

  const openAddCommentForm = () => setIsOpenAddComment(true);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  handleSelectUser={handleSelectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {loading === 'posts' && <Loader />}
                {(errorMessage === 'posts' || errorMessage === 'users') && (
                  <Notification
                    content="Something went wrong!"
                    classType="is-danger"
                    dataCy="PostsLoadingError"
                  />
                )}
                {/* eslint-disable @typescript-eslint/indent */}
                {!loading &&
                  selectedUser &&
                  posts.length === 0 &&
                  !errorMessage && (
                    <Notification
                      content="No posts yet"
                      classType="is-warning"
                      dataCy="NoPostsYet"
                    />
                  )}
                {selectedUser && posts.length > 0 && (
                  <OpenPostContext.Provider value={openPost}>
                    <PostsList posts={posts} handleOpenPost={handleOpenPost} />
                  </OpenPostContext.Provider>
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
              { 'Sidebar--open': openPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {openPost && (
                <PostDetails
                  post={openPost}
                  loading={loading}
                  errorMessage={errorMessage}
                  comments={comments}
                  isOpenAddComment={isOpenAddComment}
                  openAddCommentForm={openAddCommentForm}
                  addComment={addComment}
                  delComment={delComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

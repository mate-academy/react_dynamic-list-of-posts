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
import { Post } from './types/Post';
import {
  getPosts,
  getUsers,
  getComments,
  addComment,
  deleteComment,
} from './api/posts';
import { User } from './types/User';
import { Comment } from './types/Comment';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [formNameError, setFormNameError] = useState(false);
  const [formEmailError, setFormEmailError] = useState(false);
  const [formBodyError, setFormBodyError] = useState(false);
  const [postIsLoading, setPostIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [postError, setPostError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPostId(null);
    setPostIsLoading(true);
    getPosts()
      .then(setPosts)
      .catch(() => setPostError(true))
      .finally(() => {
        setPostIsLoading(false);
        setPostError(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedPostId === null) {
      return;
    }

    setIsFormActive(false);
    setIsCommentsLoading(true);
    getComments()
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => {
        setIsCommentsLoading(false);
        setCommentsError(false);
      });
  }, [selectedPostId]);

  const filteredPosts = selectedUser
    ? posts.filter(post => post.userId === selectedUser.id)
    : [];

  const filteredComments = selectedPostId
    ? comments.filter(comment => comment.postId === selectedPostId)
    : [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedPostId === null) {
      return;
    }

    const isNameValid = form.name.trim() !== '';
    const isEmailValid = form.email.trim() !== '';
    const isBodyValid = form.body.trim() !== '';

    setFormNameError(!isNameValid);
    setFormEmailError(!isEmailValid);
    setFormBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    const newComment = {
      postId: selectedPostId,
      name: form.name,
      email: form.email,
      body: form.body,
    };

    setIsCommentLoading(true);
    setCommentsError(false);

    addComment(newComment)
      .then(createdComment => {
        setComments(prev => [...prev, createdComment]);
        setForm({
          name: form.name,
          email: form.email,
          body: '',
        });
      })
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setIsCommentLoading(false);
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === 'name' && value.trim() !== '') {
      setFormNameError(false);
    }

    if (name === 'email' && value.trim() !== '') {
      setFormEmailError(false);
    }

    if (name === 'body' && value.trim() !== '') {
      setFormBodyError(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      body: '',
    });

    setFormNameError(false);
    setFormEmailError(false);
    setFormBodyError(false);
  };

  const handleDeleteComment = (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      if (deletedComment) {
        setComments(prev => [...prev, deletedComment]);
      }

      setCommentsError(true);
    });
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postIsLoading && <Loader />}

                {postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!postIsLoading &&
                  selectedUser &&
                  filteredPosts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!postIsLoading && selectedUser && filteredPosts.length > 0 && (
                  <PostsList
                    posts={filteredPosts}
                    onPostSelect={setSelectedPostId}
                    selectedPostId={selectedPostId}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                postId={selectedPostId}
                comments={filteredComments}
                isLoading={isCommentsLoading}
                isCommentLoading={isCommentLoading}
                isError={commentsError}
                posts={posts}
                form={form}
                isFormActive={isFormActive}
                formNameError={formNameError}
                formEmailError={formEmailError}
                formBodyError={formBodyError}
                setIsFormActive={() => setIsFormActive(true)}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                deleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

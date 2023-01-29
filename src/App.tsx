import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import './App.scss';

import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { PostList } from './components/PostList';
import { Loader } from './components/Loader';

import { addComment, getComments, removeComment } from './api/comment';
import { getPosts } from './api/post';
import { getUsers } from './api/user';

import { FormField } from './types/FormField';
import { ServerErrors } from './types/enums/Errors';
import { Comment } from './types/Comment';
import { User } from './types/User';
import { Post } from './types/Post';
import { NewCommentForm } from './components/NewCommentForm';

export const App: React.FC = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [error, setError] = useState<ServerErrors | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isFormRequested, setIsFormRequested] = useState(false);
  const [AreCommentsLoading, setAreCommentsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isRetryLoading, setIsRetryLoading] = useState(false);

  const initialFormField = {
    content: '',
    error: false,
  };

  const errorFormField = {
    content: '',
    error: true,
  };

  const [name, setName] = useState<FormField>(initialFormField);
  const [email, setEmail] = useState<FormField>(initialFormField);
  const [body, setBody] = useState<FormField>(initialFormField);

  const initialComment = {
    id: 0,
    postId: 0,
    name: '',
    email: '',
    body: '',
  };

  const [commentToAdd, setCommentToAdd] = useState<Comment>(initialComment);
  const [commentIdOnDelete, setCommentIdOnDelete] = useState(0);

  const userOrPostError = (
    error === ServerErrors.Users || error === ServerErrors.Posts
  );

  const fetchUsers = async () => {
    setError(null);

    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(ServerErrors.Users);
    }
  };

  const fetchPosts = async (id: number) => {
    setIsPostLoading(true);
    setError(null);

    try {
      const postsFromServer: Post[] = await getPosts(id);

      setPosts(postsFromServer);
    } catch {
      setError(ServerErrors.Posts);
    } finally {
      setIsPostLoading(false);
    }
  };

  const fetchCommentsByPostId = async (id: number) => {
    setAreCommentsLoading(true);
    setError(null);

    try {
      const commentsFromServer: Comment[] = await getComments(id);

      setComments(commentsFromServer);
    } catch {
      setError(ServerErrors.Comments);
    } finally {
      setAreCommentsLoading(false);
    }
  };

  const postComment = async (comment: Comment) => {
    setIsFormLoading(true);

    try {
      const newComment = await addComment(comment);

      setComments([...comments, newComment]);
      setBody(initialFormField);
    } catch {
      setError(ServerErrors.NewComment);
    } finally {
      setIsFormLoading(false);
      setIsRetryLoading(false);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      setComments(comments.filter(comment => comment.id !== id));

      await removeComment(id);
    } catch {
      setError(ServerErrors.CommentDeletion);
      setComments(comments);
    } finally {
      setIsRetryLoading(false);
    }
  };

  const handleSelectedUser = (user: User) => {
    if (activeUser && user.id === activeUser.id) {
      return;
    }

    fetchPosts(user.id);

    setActiveUser(user);
    setActivePost(null);
  };

  const handleSelectedPost = (post: Post) => {
    if (post.id === activePost?.id) {
      setActivePost(null);

      return;
    }

    fetchCommentsByPostId(post.id);

    setActivePost(post);
    setIsFormRequested(false);
    setName(initialFormField);
    setEmail(initialFormField);
  };

  const handleInputContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    const updatedData = {
      content: inputValue,
      error: false,
    };

    switch (inputName) {
      case 'name':
        setName(updatedData);

        break;

      case 'email':
        setEmail(updatedData);
        break;

      default: break;
    }
  };

  const handleInputTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody({
      content: event.target.value,
      error: false,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.content) {
      setName(errorFormField);
    }

    if (!email.content) {
      setEmail(errorFormField);
    }

    if (!body.content) {
      setBody(errorFormField);
    }

    if (!name.content || !email.content || !body.content) {
      return;
    }

    if (activePost) {
      const newComment = {
        id: 0,
        postId: activePost.id,
        name: name.content,
        email: email.content,
        body: body.content,
      };

      postComment(newComment);

      setCommentToAdd(newComment);
      setError(null);
    }
  };

  const resetFormFields = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    setName(initialFormField);
    setEmail(initialFormField);
    setBody(initialFormField);
  };

  const handleCommentDeletion = (commentID: number) => {
    deleteComment(commentID);

    setCommentIdOnDelete(commentID);
  };

  const handleRetryAddOrDelete = () => {
    setIsRetryLoading(true);
    setError(null);

    if (error === ServerErrors.NewComment) {
      postComment(commentToAdd);
    } else if (error === ServerErrors.CommentDeletion) {
      deleteComment(commentIdOnDelete);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUser={activeUser}
                  onOpeningPosts={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostLoading && <Loader />}

                {(error && userOrPostError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {(activeUser && !posts.length && !isPostLoading && !error) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(posts.length > 0 && !isPostLoading) && (
                  <PostList
                    posts={posts}
                    activePost={activePost}
                    onOpeningPostDetails={handleSelectedPost}
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
              {
                'Sidebar--open': activePost,
              },
            )}
          >
            <div className="tile is-child box is-success ">

              {activePost && (
                <div className="content" data-cy="PostDetails">
                  <div className="content" data-cy="PostDetails">
                    <PostDetails
                      activePost={activePost}
                      comments={comments}
                      error={error}
                      AreCommentsLoading={AreCommentsLoading}
                      isFormRequested={isFormRequested}
                      isRetryLoading={isRetryLoading}
                      onFormRequest={setIsFormRequested}
                      onDelete={handleCommentDeletion}
                      onRetry={handleRetryAddOrDelete}
                      setError={setError}
                    />

                    {isFormRequested && (
                      <NewCommentForm
                        name={name}
                        email={email}
                        body={body}
                        isFormLoading={isFormLoading}
                        onNameChange={handleInputContacts}
                        onTextAreaChange={handleInputTextArea}
                        onSubmit={handleFormSubmit}
                        onReset={resetFormFields}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

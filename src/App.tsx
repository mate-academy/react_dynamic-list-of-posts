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
import {
  getPostComments,
  getPostsByUserId,
  getUsers,
  addComment,
  deleteCommentInPost,
} from './api/postAPIFunctions';
import { ErrorMessage } from './types/ErrorMessage';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [openedPostId, setOpenedPostId] = useState<number | null>(null);
  const [noPostMessage, setNoPostMessage] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState('');
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [bodyComment, setBodyComment] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyCommentError, setBodyCommentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [writeComment, setWriteComment] = useState(false);

  useEffect(() => {
    getUsers()
      .then(allUsers => {
        setUsers(allUsers);
      })
      .catch(() => setErrorMessage(ErrorMessage.LOAD_DATA));
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setPostList([]);
      setErrorMessage(null);
      getPostsByUserId(user.id)
        .then(posts => {
          setPostList(posts);
          setNoPostMessage(posts.length === 0);
        })
        .catch(() => setErrorMessage(ErrorMessage.LOAD_DATA))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  useEffect(() => {
    if (post) {
      setIsLoadingPost(true);
      setCommentsList([]);
      setErrorMessage(null);
      getPostComments(post.id)
        .then(comments => {
          setCommentsList(comments);
        })
        .catch(() => setErrorMessage(ErrorMessage.LOAD_DATA))
        .finally(() => setIsLoadingPost(false));
    }
  }, [post]);

  const handleChooseUser = (choosenUser: User) => {
    setUser(choosenUser);
    setPost(null);
    setOpenedPostId(null);
  };

  const handleShowPostDetail = (userPost: Post) => {
    if (post) {
      if (post === userPost) {
        setOpenedPostId(prev => (prev === userPost.id ? null : userPost.id));
        setPost(null);
      } else {
        setOpenedPostId(prev => (prev === userPost.id ? null : userPost.id));
        setPost(userPost);
        setWriteComment(false);
      }
    } else {
      setOpenedPostId(prev => (prev === userPost.id ? null : userPost.id));
      setPost(userPost);
      setWriteComment(false);
    }
  };

  const handleTitleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitleValue(event.target.value);
    setTitleError(false);
  };

  const handleEmailComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmailValue(event.target.value);
    setEmailError(false);
  };

  const handleBodyComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyComment(event.target.value);
    setBodyCommentError(false);
  };

  const handleSubmitAddCommentToPost = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (inputTitleValue === '') {
      setTitleError(true);
    }

    if (inputEmailValue === '') {
      setEmailError(true);
    }

    if (bodyComment === '') {
      setBodyCommentError(true);
    }

    if (
      inputTitleValue === '' ||
      inputEmailValue === '' ||
      bodyComment === ''
    ) {
      return;
    }

    const newComment: Comment = {
      id: 0,
      postId: post.id,
      name: inputTitleValue,
      email: inputEmailValue,
      body: bodyComment,
    };

    setIsLoadingAddComment(true);
    setErrorMessage(null);
    addComment(newComment)
      .then(addedComment => {
        setCommentsList(prev => [...prev, addedComment]);
      })
      .catch(() => setErrorMessage(ErrorMessage.UNABLE_ADD))
      .finally(() => {
        setIsLoadingAddComment(false);
        setBodyComment('');
      });
  };

  const handleClearButton = () => {
    setInputTitleValue('');
    setInputEmailValue('');
    setBodyComment('');
    setTitleError(false);
    setEmailError(false);
    setBodyCommentError(false);
  };

  const handleDeleteComment = (deletCommentId: number) => {
    setCommentsList(prev =>
      prev.filter(commentToDelet => commentToDelet.id !== deletCommentId),
    );

    deleteCommentInPost(deletCommentId)
      .then(() => {
        setCommentsList(prev =>
          prev.filter(comm => comm.id !== deletCommentId),
        );
      })
      .catch(() => setErrorMessage(ErrorMessage.UNABLE_DELETE));
  };

  const handleFormComment = () => {
    setWriteComment(true);
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
                  handleChooseUser={handleChooseUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}
                {isLoading && <Loader />}
                {!isLoading && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!isLoading && user && noPostMessage && !errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoading && postList.length > 0 && (
                  <PostsList
                    posts={postList}
                    handleShowPostDetail={handleShowPostDetail}
                    openedPostId={openedPostId}
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
              { 'Sidebar--open': post },
            )}
          >
            {post && (
              <PostDetails
                post={post}
                commentsList={commentsList}
                isLoadingPost={isLoadingPost}
                errorMessage={errorMessage}
                inputTitleValue={inputTitleValue}
                inputEmailValue={inputEmailValue}
                bodyComment={bodyComment}
                isLoadingAddComment={isLoadingAddComment}
                titleError={titleError}
                emailError={emailError}
                bodyCommentError={bodyCommentError}
                writeComment={writeComment}
                handleFormComment={handleFormComment}
                handleTitleComment={handleTitleComment}
                handleEmailComment={handleEmailComment}
                handleBodyComment={handleBodyComment}
                handleSubmitAddCommentToPost={handleSubmitAddCommentToPost}
                handleClearButton={handleClearButton}
                handleDeleteComment={handleDeleteComment}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

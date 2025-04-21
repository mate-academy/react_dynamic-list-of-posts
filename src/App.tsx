import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import * as CommentServise from './api/comments';
import { Comment, CommentData } from './types/Comment';
import { ErrorsType, InputDataType } from './types/InputCommentData';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpened, setFormOpened] = useState(false);

  const [inputCommentData, setInputCommentData] = useState<InputDataType>({
    name: '',
    email: '',
    body: '',
  });

  const [inputCommentErrors, setInputCommentErrors] = useState<ErrorsType>({
    nameError: '',
    emailError: '',
    bodyError: '',
  });

  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadPosts = useCallback(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => {
        setErrorMessage('Unable to load posts');
      })
      .finally(() => setLoading(false));
  }, [selectedUser]);

  const loadComments = useCallback(() => {
    setLoadingComments(true);
    if (!selectedPost) {
      return;
    }

    CommentServise.getComments(selectedPost.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Unable to load comments');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoadingComments(false));

    setFormOpened(false);
    setIsSubmitting(false);
  }, [selectedPost]);

  const addComment = (data: CommentData) => {
    const { name, email, body } = data;

    setIsSubmitting(true);

    if (selectedPost) {
      CommentServise.addNewComment({ ...data, postId: selectedPost.id })
        .then(commentFromResponse => {
          setComments(currentComments => [
            ...currentComments,
            commentFromResponse,
          ]);
          setInputCommentData({ ...inputCommentData, body: '' });
        })
        .catch(() => {
          setErrorMessage('Failed to add comment');
          setInputCommentData({ name: name, email: email, body: body });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const deleteComment = (commentId: number) => {
    // setLoading(true);

    CommentServise.deleteComment(commentId)
      .then(() => {
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to delete comemnt');
      })
      .finally(() => {
        // setLoading(false);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    loadPosts();
  }, [selectedUser, loadPosts, setSelectedUser]);

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    loadComments();
  }, [loadComments, selectedPost]);

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

                {loading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {posts.length === 0 && selectedUser && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !loading && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setLoadingComments={setLoadingComments}
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
              <PostDetails
                selectedPost={selectedPost}
                loading={loading}
                comments={comments}
                errorMessage={errorMessage}
                addComment={addComment}
                inputCommentData={inputCommentData}
                setInputCommentData={setInputCommentData}
                inputCommentErrors={inputCommentErrors}
                setInputCommentErrors={setInputCommentErrors}
                deleteComment={deleteComment}
                loadingComments={loadingComments}
                formOpened={formOpened}
                setFormOpened={setFormOpened}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

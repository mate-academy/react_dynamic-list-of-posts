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
import { getUserPosts, getUsers } from './api/users';
import { Post } from './types/Post';
import { createAComment, deleteComment, getPostComments } from './api/comments';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [postsError, setPostsError] = useState('');
  // const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Unable to load users');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setPostsError('');
    setSelectedPost(null);

    if (selectedUser) {
      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => {
          setPostsError("Unable to load user's posts");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    setErrorMessage('');
    setCommentsLoading(true);
    setCommentFormOpened(false);

    if (selectedPost !== null) {
      getPostComments(selectedPost.id)
        .then(setPostComments)
        .catch(() => {
          setErrorMessage('Unable to load post comments');
        })
        .finally(() => {
          setCommentsLoading(false);
        });
    }
  }, [selectedPost]);

  const createComment = (
    postId: number,
    newComment: CommentData,
  ): Promise<Comment> => {
    setIsSubmitting(true);
    setErrorMessage('');

    return createAComment(postId, newComment)
      .then(createdComment => {
        setPostComments(prevComments =>
          prevComments ? [...prevComments, createdComment] : [createdComment],
        );

        return createdComment;
      })
      .catch(error => {
        setErrorMessage('Unable to create a comment');
        throw error;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setPostComments(prevComments =>
          prevComments
            ? prevComments.filter(com => com.id !== commentId)
            : null,
        );
      })
      .catch(() => {
        setErrorMessage('Unable to delete a comment');
      })
      .finally();
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

                {loading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts?.length === 0 && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts !== null && userPosts?.length !== 0 && !loading && (
                  <PostsList
                    userPosts={userPosts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost !== null && (
                <PostDetails
                  selectedPost={selectedPost}
                  postComments={postComments}
                  commentsLoading={commentsLoading}
                  // commentsError={commentsError}
                  commentFormOpened={commentFormOpened}
                  setCommentFormOpened={setCommentFormOpened}
                  createComment={createComment}
                  isSubmitting={isSubmitting}
                  onDeleteComment={onDeleteComment}
                  errorMessage={errorMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

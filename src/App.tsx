import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUsers } from './api/user';
import { User } from './types/User';
import { getPosts } from './api/post';
import { Post } from './types/Post';
import { addComment, deleteComment, getComments } from './api/comment';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [isErrorComment, setIsErrorComment] = useState(false);
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {});
  }, []);

  function getUserPosts(userId: number) {
    setIsLoading(true);
    setIsUserSelected(true);

    getPosts(userId)
      .then(setUserPosts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function openPost(post: Post) {
    setOpenedPost(post);
    setIsLoadingComment(true);

    getComments(post.id)
      .then(setPostComments)
      .catch(() => {
        setIsErrorComment(true);
      })
      .finally(() => {
        setIsLoadingComment(false);
      });
  }

  function closePost() {
    setOpenedPost(null);
  }

  function createComment(comment: Omit<Comment, 'id'>) {
    if (!openedPost) {
      return;
    }

    setIsLoadingNewComment(true);

    addComment(comment)
      .then(() => getComments(openedPost.id))
      .then(setPostComments)
      .catch(() => {
        setIsErrorComment(true);
      })
      .finally(() => {
        setIsLoadingNewComment(false);
      });
  }

  function removeComment(commentId: number) {
    const updatedComments = postComments.filter(com => {
      return com.id !== commentId;
    });

    setPostComments(updatedComments);

    deleteComment(commentId)
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} getUserPosts={getUserPosts} />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts.length === 0 && isUserSelected === true && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    openPost={openPost}
                    closePost={closePost}
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
              { 'Sidebar--open': openedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                openedPost={openedPost}
                postComments={postComments}
                isLoadingComment={isLoadingComment}
                isErrorComment={isErrorComment}
                createComment={createComment}
                isLoadingNewComment={isLoadingNewComment}
                removeComment={removeComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

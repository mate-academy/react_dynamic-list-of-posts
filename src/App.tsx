//#region Imports
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
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';
//#endregion

const ERROR_TEXT = 'Something went wrong';

export const App = () => {
  //#region States
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  //#endregion
  //#region Should Show Constants
  const shouldShowNoPosts =
    selectedUser && !isPostsLoading && !postsError && posts.length === 0;
  const shouldShowPostsList =
    selectedUser && !isPostsLoading && !postsError && posts.length > 0;

  //#endregion
  //#region Effects
  useEffect(() => {
    setIsUserLoading(true);
    setUsersError(null);

    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => {
        setUsersError(ERROR_TEXT);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setPostsError(null);
    setPosts([]);
    setSelectedPost(null);
    setIsPostsLoading(true);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(setPosts)
      .catch(() => {
        setPostsError(ERROR_TEXT);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    setCommentsError(null);
    setComments([]);
    setIsCommentsLoading(true);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => {
        setCommentsError(ERROR_TEXT);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [selectedPost]);
  //#endregion
  //#region Handles
  const handleCommentAdded = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));

    client.delete(`/comments/${commentId}`);
  };
  //#endregion

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              {isUserLoading && <Loader />}

              {usersError && (
                <div className="notification is-danger">{usersError}</div>
              )}

              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isPostsLoading && <Loader />}

                {selectedUser && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelect={setSelectedPost}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments}
                commentsError={commentsError}
                isCommentsLoading={isCommentsLoading}
                onCommentAdded={handleCommentAdded}
                onCommentDelete={handleCommentDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

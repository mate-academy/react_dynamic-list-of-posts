import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getPostComments, getUserPosts, getUsers } from './api/request';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGetPostsError, setIsGetPostsError] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isGetCommentsError, setIsGetCommentsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const userPostLeng: number = userPosts.length;
  const userHasNoPosts: boolean =
    !isGetPostsError &&
    userPostLeng === 0 &&
    selectedUserId !== null &&
    !isLoading;

  const selectedPost: Post | undefined = useMemo(() => {
    return userPosts.find(post => post.id === selectedPostId);
  }, [selectedPostId, userPosts]);

  useEffect(() => {
    getUsers().then(result => {
      setUsers(result);
    });
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      setIsGetPostsError(false);
      setIsLoading(true);

      getUserPosts(selectedUserId)
        .then(result => {
          setUserPosts(result);
        })
        .catch(() => {
          setIsGetPostsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPost) {
      setIsGetCommentsError(false);
      setIsLoadingComments(true);

      getPostComments(selectedPost.id)
        .then(result => {
          setComments(result);
        })
        .catch(() => {
          setIsGetCommentsError(true);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  onSelectedPostId={setSelectedPostId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}

                {isGetPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPostLeng > 0 && selectedUserId && !isLoading && (
                  <PostsList
                    posts={userPosts}
                    onSelectedPostId={setSelectedPostId}
                    selectedPostId={selectedPostId}
                  />
                )}

                {userHasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isGetCommentsError={isGetCommentsError}
                  isLoadingComments={isLoadingComments}
                  selectedPostId={selectedPostId}
                  key={selectedPostId}
                  onComments={setComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

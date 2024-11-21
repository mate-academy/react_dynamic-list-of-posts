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
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorLoadPosts, setErrorLoadPosts] = useState<boolean>(false);
  const [openPostDetails, setOpenPostDetails] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorLoadComments, setErrorLoadComments] = useState<boolean>(false);
  const [writeComment, setWriteComment] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  function getPostsUser(user: User) {
    setLoadingPosts(true);
    getPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setErrorLoadPosts(true);
      })
      .finally(() => setLoadingPosts(false));
  }

  function getCommentsPost(gettingPost: Post) {
    setLoadingComments(true);
    getComments(gettingPost.id)
      .then(setComments)
      .catch(() => {
        setErrorLoadComments(true);
      })
      .finally(() => setLoadingComments(false));
  }

  const showPostsList: boolean | null =
    !!posts.length && !errorLoadPosts && userSelected && !loadingPosts;

  const showNoPostsYet: boolean | null =
    posts.length === 0 && !errorLoadPosts && userSelected && !loadingPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userSelected={userSelected}
                  setUserSelected={setUserSelected}
                  getPostUser={getPostsUser}
                  setOpenPostDetails={setOpenPostDetails}
                  setWriteComment={setWriteComment}
                  setPosts={setPosts}
                  setPost={setPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {users.length > 0 && !userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {errorLoadPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={posts}
                    setPost={setPost}
                    openPostDetails={openPostDetails}
                    setOpenPostDetails={setOpenPostDetails}
                    getCommentsPost={getCommentsPost}
                    setWriteComment={setWriteComment}
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
              { 'Sidebar--open': openPostDetails },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails
                  post={post}
                  comments={comments}
                  setComments={setComments}
                  loadingComments={loadingComments}
                  errorLoadComments={errorLoadComments}
                  writeComment={writeComment}
                  setWriteComment={setWriteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

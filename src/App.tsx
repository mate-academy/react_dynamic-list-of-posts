import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [hasErrorGetPosts, setHasErrorGetPosts] = useState(false);
  const [hasErrorGetComments, setHasErrorGetComments] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setHasErrorGetPosts={setHasErrorGetPosts}
                  setIsLoadingPosts={setIsLoadingPosts}
                  setPosts={setPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!posts && <p data-cy="NoSelectedUser">No user selected</p>}
                {isLoadingPosts && <Loader />}

                {hasErrorGetPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts?.length > 0 && (
                  <PostsList
                    posts={posts}
                    setComments={setComments}
                    setHasErrorGetComments={setHasErrorGetComments}
                    setIsLoadingComments={setIsLoadingComments}
                    setPost={setPost}
                  />
                )}
              </div>
            </div>
          </div>

          {post && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  post={post}
                  hasErrorGetComments={hasErrorGetComments}
                  isLoadingComments={isLoadingComments}
                  setComments={setComments}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

import classNames from 'classnames';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';

type Props = {
  posts: Post[] | null;
}

export const App: React.FC<Props> = ({ posts }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <main className="section">
    <div className="container">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box is-success">
            <div className="block">
              <UserSelector onSelectUser={setSelectedUserId} />
            </div>

            <div className="block" data-cy="MainContent">

            {!selectedUserId &&
              <p data-cy="NoSelectedUser">No user selected</p>
            }

              {isLoading && <Loader />}

              {hasError && (
                <div className="notification is-danger" data-cy="PostsLoadingError">
                  Something went wrong!
                </div>
              )}

              {(selectedUserId && !isLoading && !hasError) && (posts && posts.length === 0 ? (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>
              ) : (
                <PostsList selectedUserId={selectedUserId} selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>
              )
              )}
            </div>
          </div>
        </div>

        <div
          data-cy="Sidebar"
          className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', { 'Sidebar--open' : selectedPost} )}
        >
          <div className="tile is-child box is-success ">
            <PostDetails selectedPost={selectedPost}/>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
};

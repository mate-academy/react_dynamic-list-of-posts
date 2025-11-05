import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { usePosts } from './hooks/UsePosts';

export const App = () => {
  const {
    userPosts,
    isLoading,
    hasError,
    selectedUserId,
    selectedPost,
    changeUser,
    selectPost,
  } = usePosts();

  const isOk = !isLoading && !hasError && selectedUserId;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onChange={changeUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts.length === 0 && isOk && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts.length > 0 && isOk && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onSelect={selectPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails selectedPost={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

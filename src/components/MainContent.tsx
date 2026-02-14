import { AppState } from '../types/App';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { PostsList } from './PostsList';

type Props = {
  ui: AppState;
  posts: Post[];
  updateUi: (newState: Partial<AppState>) => void;
};

export const MainContent: React.FC<Props> = ({ ui, posts, updateUi }) => {
  return (
    <>
      {ui.selectedUser ? (
        ui.isLoadingPosts ? (
          <Loader />
        ) : ui.postsError ? (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            Something went wrong!
          </div>
        ) : posts.length > 0 ? (
          <PostsList
            posts={posts}
            onPostSelect={post => updateUi({ selectedPost: post })}
            selectedPost={ui.selectedPost}
          />
        ) : (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        )
      ) : (
        <p data-cy="NoSelectedUser">No user selected</p>
      )}
    </>
  );
};

import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { Post } from '../types/Post';

type Props = {
  selectedUserId: number;
  posts: Post[];
  loading: boolean;
  error: boolean;
  selectedPostId: number;
  onSelectPost: (post: Post | null) => void;
};

export const MainContent: React.FC<Props> = ({
  selectedUserId,
  posts,
  loading,
  error,
  selectedPostId,
  onSelectPost,
}) => {
  if (!selectedUserId) {
    return (
      <div className="block" data-cy="MainContent">
        <p data-cy="NoSelectedUser">No user selected</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="block" data-cy="MainContent">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      </div>
    );
  }

  return (
    <div className="block" data-cy="MainContent">
      <PostsList
        posts={posts}
        selectedPostId={selectedPostId}
        onSelect={onSelectPost}
      />
    </div>
  );
};

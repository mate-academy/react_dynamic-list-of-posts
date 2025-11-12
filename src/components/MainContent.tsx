import { TypeErrorMessages } from '../types/ErrorMessages';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Loader } from './Loader';
import { PostsList } from './PostsList';

interface Props {
  selectUser: User | null;
  posts: Post[];
  errorMes: TypeErrorMessages | null;
  loadingPost: boolean;
  selectedPost: Post | null;
  onPost: (post: Post | null) => void;
}

export const MainContent = ({
  selectUser,
  posts,
  errorMes,
  loadingPost,
  selectedPost,
  onPost,
}: Props) => {
  if (selectUser === null) {
    return (
      <div className="block" data-cy="MainContent">
        <p data-cy="NoSelectedUser">No user selected</p>
      </div>
    );
  }

  if (loadingPost) {
    return (
      <div className="block" data-cy="MainContent">
        <Loader />
      </div>
    );
  }

  if (errorMes === TypeErrorMessages.Wrong) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {TypeErrorMessages.Wrong}
        </div>
      </div>
    );
  }

  if (errorMes === TypeErrorMessages.noPosts) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-warning" data-cy="NoPostsYet">
          {TypeErrorMessages.noPosts}
        </div>
      </div>
    );
  }

  return (
    <div className="block" data-cy="MainContent">
      <PostsList posts={posts} selectedPost={selectedPost} onPost={onPost} />
    </div>
  );
};

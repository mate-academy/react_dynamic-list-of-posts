import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  openedPost: Post | null;
  onOpen: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, openedPost, onOpen }) => {
  const handleClick = (post: Post) => {
    if (post.id === openedPost?.id) {
      onOpen(null);
    } else {
      onOpen(post);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            return (
              <PostItem
                key={post.id}
                post={post}
                isOppened={openedPost?.id === post.id}
                onClick={handleClick}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import { Post } from '../../types/Post';
import { PostListItem } from './PostListItem';

type Props = {
  posts: Post[];
  toggleSidebar: (postId: number) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  toggleSidebar,
  selectedPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            return (
              <PostListItem
                key={post.id}
                post={post}
                toggleSidebar={toggleSidebar}
                selectedPost={selectedPost}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

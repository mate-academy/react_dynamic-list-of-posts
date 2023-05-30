import { PostItem } from './components/PostItem';
import { PostsListProps } from '../../types';

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  currentPostId,
  getComments,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => (
          <PostItem
            post={post}
            key={post.id}
            currentPostId={currentPostId}
            getComments={getComments}
          />
        ))}
      </tbody>
    </table>
  </div>
);

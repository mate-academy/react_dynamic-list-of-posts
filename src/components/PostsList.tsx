import { IPost } from '../types';
import { Post } from './Post';

type Props = {
  posts: IPost[]
};

export const PostsList: React.FC<Props> = ({ posts }) => (
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
          <Post post={post} />
        ))}
      </tbody>
    </table>
  </div>
);

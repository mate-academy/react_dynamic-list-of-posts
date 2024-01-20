import { useContext } from 'react';
import { PostItem } from './PostItem';
import { MainContext } from '../MainContext';

export const PostsList: React.FC = () => {
  const { posts } = useContext(MainContext);

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
          {posts?.map(post => <PostItem key={post.id} post={post} />)}
        </tbody>
      </table>
    </div>
  );
};

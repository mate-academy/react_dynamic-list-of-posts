import { useContext } from 'react';

import { PostContext } from '../../context/PostContext';
import { PostItem } from '../PostItem';

export const PostsList: React.FC = () => {
  const {
    posts,
  } = useContext(PostContext);

  return (
    (
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
              <PostItem key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

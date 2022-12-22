import {
  FC,
  memo,
  useContext,
} from 'react';

import { PostsContext } from '../../../context/PostsContext';
import { PostItem } from './PostItem';

export const PostsList: FC = memo(() => {
  const { userPosts } = useContext(PostsContext);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table
        className="
          table
          is-fullwidth
          is-striped
          is-hoverable
          is-narrow
        "
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {userPosts && userPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

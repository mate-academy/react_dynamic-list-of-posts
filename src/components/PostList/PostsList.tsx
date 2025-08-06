import React, { useContext } from 'react';
import { PostItem } from '../PostItem';
import { UserPostsContext } from '../../Context/UserPostsContext';

export const PostsList: React.FC = () => {
  const { userPosts: postList } = useContext(UserPostsContext);

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
          {postList.map(postItem => (
            <PostItem key={postItem.id} postItem={postItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

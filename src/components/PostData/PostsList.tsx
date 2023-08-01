import React from 'react';
import { Post } from '../../types/Post';
import { PostInfo } from './PostInfo';

type Props = {
  postsList: Post[]
};

export const PostsList: React.FC<Props> = ({ postsList }) => {
  return (
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
          {postsList.map((post) => <PostInfo key={post.id} post={post} />)}
        </tbody>
      </table>
    </div>
  );
};

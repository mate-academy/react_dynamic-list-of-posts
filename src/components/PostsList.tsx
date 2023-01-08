import React from 'react';

import { PostItem } from './PostItem';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts } = props;

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
          {posts.map(post => (
            <PostItem post={post} key={post.id} />
          ))}

          {/* <tr data-cy="Post">
            <td data-cy="PostId">18</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
              >
                Close
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

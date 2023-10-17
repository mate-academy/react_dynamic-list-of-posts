import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[]
  hendleOpenPost:(id: number) => void
  idOfOpenPost: number | null
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  hendleOpenPost,
  idOfOpenPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table
        className="table is-fullwidth is-striped is-hoverable is-narrow"
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {userPosts.map(post => {
            return (
              <tr
                key={post.id}
                data-cy="Post"
              >
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={
                      classNames('button is-link',
                        { ' is-light': idOfOpenPost !== post.id })
                    }
                    onClick={() => hendleOpenPost(post.id)}
                  >
                    {idOfOpenPost === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

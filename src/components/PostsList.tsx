import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  setChoosePost: React.Dispatch<React.SetStateAction<Post | null>>;
  choosePost: Post | null;
  allPosts: Post[] | null;
};

export const PostsList: React.FC<Props> = ({
  setChoosePost,
  choosePost,
  allPosts,
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
          {allPosts?.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    onClick={() =>
                      setChoosePost(choosePost?.id === post.id ? null : post)
                    }
                    className={classNames('button is-link', {
                      'is-light': post.id !== choosePost?.id,
                    })}
                  >
                    {post.id === choosePost?.id ? 'Close' : 'Open'}
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

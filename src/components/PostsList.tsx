import { FC } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  activePost: Post | null;
  getActivePost: (post: Post | null) => void;
};

export const PostsList: FC<Props> = ({
  posts,
  activePost,
  getActivePost = () => {},
}) => {
  const handleOpenPost = (post: Post) => {
    if (activePost?.id !== post.id) {
      getActivePost(post);
    } else {
      getActivePost(null);
    }
  };

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
          {posts.map(post => {
            const { id, title } = post;
            const active = activePost?.id !== id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': active,
                    })}
                    onClick={() => {
                      handleOpenPost(post);
                    }}
                  >
                    {active ? 'Open' : 'Close'}
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

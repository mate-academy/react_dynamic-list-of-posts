import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

export const PostsList: FC<Props> = ({
  posts,
  selectedPost,
  onSelectedPost,
}) => {
  const handleTogglePost = (post: Post) =>
    selectedPost === post ? onSelectedPost(null) : onSelectedPost(post);

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
          {posts.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => handleTogglePost(post)}
                  >
                    {selectedPost && selectedPost.id === post.id
                      ? 'Close'
                      : 'Open'}
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

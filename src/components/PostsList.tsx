import { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import { Post } from './../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelectPost: Dispatch<SetStateAction<Post | null>>;
}

export const PostsList: FC<Props> = ({ posts, selectedPost, onSelectPost }) => {
  const [isPostOpened, setIsPostOpened] = useState(false);

  const handlerOpeningPost = (post: Post) => {
    const isSamePost = selectedPost?.id === post.id;

    setIsPostOpened(!isSamePost);
    onSelectPost(isSamePost ? null : post);
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
            const activePost =
              selectedPost?.id === post.id ? isPostOpened : null;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': !activePost,
                    })}
                    onClick={() => handlerOpeningPost(post)}
                  >
                    {activePost ? 'Close' : 'Open'}
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

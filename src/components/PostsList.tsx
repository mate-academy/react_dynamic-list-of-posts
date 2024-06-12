import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelect,
}) => {
  const [isOpenPost, setIsOpenPost] = useState(false);

  const handlerOpeningPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setIsOpenPost(!isOpenPost);
      onSelect(null);
    } else {
      onSelect(post);
      setIsOpenPost(true);
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
            const activePost = selectedPost?.id === id ? isOpenPost : null;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    // eslint-disable-next-line max-len
                    className={cn('button is-link', {
                      'is-light': !activePost,
                    })}
                    onClick={() => handlerOpeningPost(post)}
                  >
                    {!activePost ? 'Open' : 'Close'}
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

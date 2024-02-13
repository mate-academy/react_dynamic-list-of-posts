import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[]
  isOpened: boolean
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  choosedPost: Post | null
  setChoosedPost: React.Dispatch<React.SetStateAction<Post | null>>
}

export const PostsList: React.FC<Props> = ({
  posts,
  setIsOpened,
  isOpened,
  choosedPost,
  setChoosedPost,
}) => {
  const handlerClick = (currentPost: Post) => {
    if (currentPost.id === choosedPost?.id && isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
      setChoosedPost(currentPost);
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
          {posts.map(post => (
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
                  onClick={() => handlerClick(post)}
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link',
                    { 'is-light': !isOpened || post.id !== choosedPost?.id })}
                >
                  {isOpened && post.id === choosedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

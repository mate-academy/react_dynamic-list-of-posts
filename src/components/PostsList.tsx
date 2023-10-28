import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const togglePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: Post,
  ) => {
    e.preventDefault();

    if (post.id === selectedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          <tr data-cy="Post">
            {
              posts.map(post => (
                <>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">
                    {post.title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link', {
                        'is-light': post.id !== selectedPost?.id,
                      })}
                      onClick={(e) => togglePost(e, post)}
                    >
                      {post.id !== selectedPost?.id
                        ? 'Open'
                        : 'Close'}

                    </button>
                  </td>
                </>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
}) => {
  const isPostSelected = (postId: number) => {
    return selectedPost !== null && postId === selectedPost.id;
  };

  const togglePostSelection = (post: Post) => {
    setSelectedPost(isPostSelected(post.id) ? null : post);
  };

  return (
    <div data-cy="PostsList">
      {posts.length > 0 && (
        <>
          <p className="title">Posts:</p>
          <table
            className="
              table
              is-fullwidth
              is-striped
              is-hoverable
              is-narrow"
          >
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
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link', {
                        'is-light': !isPostSelected(post.id),
                      })}
                      onClick={() => togglePostSelection(post)}
                    >
                      {isPostSelected(post.id) ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

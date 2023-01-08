import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
  setLoadingComments: (isLoad: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts, selectedPost, setSelectedPost, setLoadingComments,
}) => {
  const isCommentsVisible = (postId: number) => (
    selectedPost && selectedPost.id === postId);

  const handlePostButton = (post: Post) => {
    setLoadingComments(true);
    if (isCommentsVisible(post.id)) {
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
          {posts.map(post => (
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link',
                    { 'is-light': !isCommentsVisible(post.id) },
                  )}
                  onClick={() => handlePostButton(post)}
                >
                  {isCommentsVisible(post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onSelectedPost: (v: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts, onSelectedPost, selectedPost,
}) => {
  const handleOpenDetails = (post: Post) => {
    if (selectedPost?.id === post.id) {
      onSelectedPost(null);
    } else {
      onSelectedPost(post);
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
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link',
                    { 'is-light': post.id !== selectedPost?.id })}
                  onClick={() => {
                    handleOpenDetails(post);
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

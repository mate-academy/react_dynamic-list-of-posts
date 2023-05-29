import classNames from 'classnames';

import { Post } from '../types/Post';

type PostListProps = {
  posts: Post[] | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPostId: number | undefined;
};

export const PostsList = ({
  posts,
  setSelectedPost,
  selectedPostId,
}: PostListProps) => {
  const handleClick = (post: Post) => {
    if (selectedPostId && selectedPostId === post.id) {
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
          {posts?.map((post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPostId !== post.id },
                  )}
                  onClick={() => handleClick(post)}
                >
                  {selectedPostId !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

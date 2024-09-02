import { Post } from '../types/Post';
import { usePostsContext } from './context/PostsContext';
import classNames from 'classnames';

export const PostsList = () => {
  const { setActivePost, activePost, posts } = usePostsContext();

  const handleTogglePost = (post: Post) => {
    if (activePost?.id === post.id) {
      setActivePost(null);
    } else {
      setActivePost(post);
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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isPostActive = activePost?.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isPostActive,
                    })}
                    onClick={() => handleTogglePost(post)}
                  >
                    {isPostActive ? 'Close' : 'Open'}
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

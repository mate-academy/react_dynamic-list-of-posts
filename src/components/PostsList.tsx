import { useContext } from 'react';
import classnames from 'classnames';
import { PostsContext } from '../context/PostsContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const { posts, post, setPost } = useContext(PostsContext);

  const handleSelectPost = (currentPost: Post | null) => {
    if (post?.id !== currentPost?.id) {
      setPost(currentPost);

      return;
    }

    setPost(null);
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
          {posts.map(currentPost => {
            const { id, title } = currentPost;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classnames('button is-link', {
                      'is-light': post?.id !== id,
                    })}
                    onClick={() => handleSelectPost(currentPost)}
                  >
                    {(post?.id === id)
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

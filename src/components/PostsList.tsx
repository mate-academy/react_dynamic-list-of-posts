import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  getCommentsByPostId: (a: number) => void;
  openPostId: number | null;
  setOpenPostId: (a: number | null) => void;
  setIsWritePostButton: (a: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  getCommentsByPostId,
  openPostId,
  setOpenPostId,
  setIsWritePostButton,
}) => {
  const handleOpenComments = (postId: number) => {
    if (openPostId === postId) {
      setOpenPostId(null);
      setIsWritePostButton(false);
    } else {
      setOpenPostId(postId);
      getCommentsByPostId(postId);
      setIsWritePostButton(false);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': openPostId !== post.id,
                  })}
                  onClick={() => handleOpenComments(post.id)}
                >
                  {openPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

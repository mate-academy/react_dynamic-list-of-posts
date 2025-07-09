import classNames from 'classnames';
import { Post } from '../types/Post';

interface PostsListProps {
  postsList: Post[] | [];
  openSidebar: boolean;
  openedPost: Post | null;
  handleOpenSidebar: (post: Post) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  postsList,
  openSidebar,
  openedPost,
  handleOpenSidebar,
}) => {
  if (postsList === null) {
    return null;
  }

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
          {postsList.map(post => {
            const isActive =
              openedPost && openSidebar && openedPost.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !isActive,
                    })}
                    onClick={() => handleOpenSidebar(post)}
                  >
                    {isActive ? 'Close' : 'Open'}
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

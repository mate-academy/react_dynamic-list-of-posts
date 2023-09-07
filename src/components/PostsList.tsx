import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  setOpenSidebar: (value: boolean) => void,
  selectedPost: Post | null,
  setSelectedPost: (value: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setOpenSidebar,
  selectedPost,
  setSelectedPost,
}) => {
  const handleOpenClick = (post: Post) => {
    setOpenSidebar(true);
    setSelectedPost(post);
  };

  const handleCloseClick = () => {
    setOpenSidebar(false);
    setSelectedPost(null);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {selectedPost?.id !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleOpenClick(post)}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={handleCloseClick}
                  >
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
          {/* <tr data-cy="Post">
            <td data-cy="PostId">17</td>

            <td data-cy="PostTitle">
              fugit voluptas sed molestias voluptatem provident
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">18</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
              >
                Close
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">19</td>
            <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">20</td>
            <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  setOpenSidebar: (value: boolean) => void,
  selectedPost: Post | null,
  setSelectedPost: (value: Post | null) => void,
  getComments: (post: Post) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setOpenSidebar,
  selectedPost,
  setSelectedPost,
  getComments,
}) => {
  const handleOpenClick = (post: Post) => {
    setOpenSidebar(true);
    setSelectedPost(post);
    getComments(post);
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
        </tbody>
      </table>
    </div>
  );
};

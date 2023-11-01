import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectPost: Post | null,
  onSelectedPost: (post: Post | null) => void,
  openedSidebar: boolean,
  setOpenedSidebar: (open: boolean) => void,
  setOpenedCommentForm: (op: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  onSelectedPost = () => {},
  openedSidebar,
  setOpenedSidebar = () => {},
  setOpenedCommentForm = () => {},
}) => {
  const handleOpenSideBar = (post: Post) => {
    setOpenedSidebar(true);
    onSelectedPost(post);
    setOpenedCommentForm(false);
  };

  const handleCloseSideBar = () => {
    setOpenedSidebar(false);
    onSelectedPost(null);
  };

  const handleSidebar = (post: Post) => {
    if (openedSidebar && selectPost?.id === post.id) {
      handleCloseSideBar();
    } else {
      handleOpenSideBar(post);
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
          {
            posts.map((post) => (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={(openedSidebar && selectPost?.id === post.id)
                      ? 'button is-link'
                      : 'button is-link is-light'}
                    onClick={() => handleSidebar(post)}
                  >
                    {(openedSidebar && selectPost?.id === post.id)
                      ? 'Close'
                      : 'Open'}
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

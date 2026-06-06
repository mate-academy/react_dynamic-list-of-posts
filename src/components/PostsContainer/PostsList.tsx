import { Post } from '../../types/Post';

interface PostsListProps {
  posts: Post[];
  openSidebar: () => void;
  closeSidebar: () => void;
  handleSelectedPost: (post: Post) => void;
  selectedPost: Post | null;
  clearSelectedPost: () => void;
}

export const PostsList = ({
  posts,
  closeSidebar,
  openSidebar,
  handleSelectedPost,
  selectedPost,
  clearSelectedPost,
}: PostsListProps) => (
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
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={
                  selectedPost?.id === post.id
                    ? 'button is-link'
                    : 'button is-link is-light'
                }
                onClick={() => {
                  if (selectedPost?.id === post.id) {
                    clearSelectedPost();
                    closeSidebar();
                  } else {
                    handleSelectedPost(post);
                    openSidebar();
                  }
                }}
              >
                {selectedPost?.id === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPost: Post | null;
  onSelectPost: (post: Post | null) => void;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  onSelectPost,
  setIsFormOpen,
}) => (
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
        {posts?.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              {selectedPost?.id === post.id ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={() => onSelectPost(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => {
                    onSelectPost(post);
                    setIsFormOpen(false);
                  }}
                >
                  Open
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { IUser } from '../../types/IUser';
import { IPost } from '../../types/IPost';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';

interface PostsListProps {
  selectedUser: IUser;
  selectedPost: IPost | null;
  handleSelectPost: (post: IPost | null) => void;
}

export const PostsList: FunctionComponent<PostsListProps> = ({
  selectedUser,
  selectedPost,
  handleSelectPost,
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPostsFromServer = async () => {
      setIsLoading(true);
      handleSelectPost(null);

      try {
        const loadPosts = await getUserPosts(selectedUser.id);

        setPosts(loadPosts);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPostsFromServer();
  }, [selectedUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
        No posts yet
      </div>
    );
  }

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
              <td data-cy="PostId">
                {post.id}
              </td>
              <td data-cy="PostTitle">
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    handleSelectPost(
                      post.id === selectedPost?.id ? null : post,
                    );
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

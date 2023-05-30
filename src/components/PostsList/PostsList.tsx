import { PostItem } from './components/PostItem';
import {
  Loading,
  Post,
  Error,
  PostsListProps,
} from '../../types';
import { getCommentsFromServer } from '../../api';

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  currentPostId,
  setCurrentPost,
  setLoading,
  setComments,
  setError,
}) => {
  const getComments = async (post: Post) => {
    if (currentPostId === post.id) {
      setCurrentPost(null);

      return;
    }

    setLoading(Loading.Comments);
    setCurrentPost(post);

    try {
      const data = await getCommentsFromServer(post.id);

      setComments(data);
    } catch {
      setError(Error.GetComments);
    } finally {
      setLoading(Loading.None);
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
          {posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              currentPostId={currentPostId}
              getComments={getComments}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

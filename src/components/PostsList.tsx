import { usePosts } from '../context/PostsContext';
import { CurrentPost } from './CurrentPost';

export const PostsList: React.FC = () => {
  const { posts } = usePosts();

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
          {posts.map(currentPost => (
            <CurrentPost
              currentPost={currentPost}
              key={currentPost.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

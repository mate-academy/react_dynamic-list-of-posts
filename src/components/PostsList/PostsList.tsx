import { Post } from '../../react-app-env';
import './PostsList.scss';

interface Props {
  posts: Post[];
  selectedPostId: number;
  onSelectPost: (postId: number) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>

            {post.id === selectedPostId
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => onSelectPost(0)}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    onSelectPost(post.id);
                  }}
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

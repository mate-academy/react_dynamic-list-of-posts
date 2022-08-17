import './PostsList.scss';
import { Post } from '../../types/Post';

interface Props {
  posts: Post[];
  selectedPost: number;
  onSelectedPost: (selectedPost: number) => void;
}

export const PostsList = ({ posts, selectedPost, onSelectedPost }: Props) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPost === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onSelectedPost(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onSelectedPost(post.id)}
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

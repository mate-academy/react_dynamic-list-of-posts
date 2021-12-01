import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectedPostId: Post['id'];
  selectPost: (newSelectedPostId: Post['id']) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  selectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts?.map(({ id, userId, title }) => (
          <>
            <div>
              <li key={id} className="PostsList__item">
                <b>{`[User #${userId}]: `}</b>
                {title}
              </li>
            </div>

            {selectedPostId === id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPost(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPost(id)}
              >
                Open
              </button>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

import {
  FC,
  memo,
  useCallback,
  useContext,
} from 'react';
import './PostsList.scss';
import { PostsContext } from '../../PostsContext';

export const PostsList: FC = memo(() => {
  const { posts, selectedPostId, setSelectedPostId } = useContext(PostsContext);

  const handleButton = useCallback((currentPostId: number) => {
    if (currentPostId !== selectedPostId) {
      setSelectedPostId(currentPostId);
    } else {
      setSelectedPostId(0);
    }
  }, [selectedPostId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                handleButton(post.id);
              }}
            >
              {
                post.id === selectedPostId
                  ? 'Close'
                  : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

import classNames from 'classnames';
import './PostsList.scss';

interface Props {
  // selectedUserID: number;
  changePostId: (postId: number) => void;
  selectedPostId: number;
  posts: Post[];
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    changePostId,
    selectedPostId,
    posts,
  } = props;

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
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            <button
              type="button"
              className={classNames(
                'PostsList__button',
                'button',
                { 'PostsList__button--choosed': selectedPostId === post.id },
              )}
              onClick={() => {
                if (selectedPostId === post.id) {
                  changePostId(0);
                } else {
                  changePostId(post.id);
                }
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

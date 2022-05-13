import './PostsList.scss';

type Props = {
  postsList: Post[],
  selectedId: number,
  handleOpenClick: (postId: number) => void;
};

export const PostsList: React.FC <Props> = ({
  postsList,
  selectedId,
  handleOpenClick,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          postsList.map(post => (
            <>
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>
                    {`[User #${post.userId}]: `}
                  </b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    handleOpenClick(post.id);
                  }}
                >
                  {post.id === selectedId ? 'Close' : 'Open'}
                </button>
              </li>
            </>
          ))
        }
      </ul>
    </div>
  );
};

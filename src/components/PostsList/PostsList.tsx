import './PostsList.scss';

type Post = {
  id: number;
  userId: number;
  title: string;
  selectedPostId: number;
};

type Props = {
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
  selectedPostId: number;
  posts: Post[],
};

export const PostsList: React.FC<Props> = ({
  setSelectedPostId,
  selectedPostId,
  posts,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => (
          <li className="PostsList__item">
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
                setSelectedPostId((selectedPostId !== post.id) ? post.id : 0);
              }}
            >
              {selectedPostId !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

type Props = {
  posts: Post[];
  selectedPostId: number;
  onOpenPostDetails: (postId: number) => void;
  onClearPostDetails: () => void;
};

export const PostsListUI: React.FC<Props> = ({
  posts,
  selectedPostId,
  onOpenPostDetails,
  onClearPostDetails,
}) => (
  <ul className="PostsList__list">
    {posts.map(post => (
      <li key={post.id} className="PostsList__item">
        <div>
          <b>
            [User #
            {post.userId}
            ]:
            {' '}
          </b>
          {post.title}
        </div>
        <button
          type="button"
          className="PostsList__button button"
          onClick={selectedPostId === post.id
            ? onClearPostDetails
            : () => {
              onOpenPostDetails(post.id);
            }}
        >
          {selectedPostId === post.id
            ? 'Close'
            : 'Open'}
        </button>
      </li>
    ))}
  </ul>
);

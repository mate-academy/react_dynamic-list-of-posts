import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = (
  {
    selectedPost,
  },
) => {
  const {
    id,
    title,
    body,
  } = selectedPost;

  return (
    <div className="tile is-child box is-success ">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <CommentsList postId={id} />
      </div>
    </div>
  );
};

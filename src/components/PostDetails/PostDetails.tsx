import { FunctionComponent } from 'react';
import { Comments } from '../Comments';
import { IPost } from '../../types/IPost';

interface PostDetailsProps {
  selectedPost: IPost;
}

export const PostDetails: FunctionComponent<PostDetailsProps> = ({
  selectedPost,
}) => {
  const { id, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
        </p>
      </div>

      <Comments postId={id} />
    </div>
  );
};

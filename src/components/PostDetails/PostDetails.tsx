import { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: Post['id'];
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isCommentsShown, setIsCommentsShown] = useState(true);

  useEffect(() => {
    const fetchPostDetils = async () => {
      try {
        const details: Post = await getPostDetails(postId);

        setPostDetails(details);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching posts');
      }
    };

    const fetchPostComments = async () => {
      try {
        const comments: Comment[] = await getPostComments(postId);

        setPostComments(comments);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching post comments');
      }
    };

    Promise.all([fetchPostDetils(), fetchPostComments()]);
  }, [postId]);

  const removeComment = (commentIdToRemove: Comment['id']) => {
    if (!postComments) {
      return;
    }

    setPostComments(
      postComments.filter((comment) => comment.id !== commentIdToRemove),
    );
  };

  const addComment = (newComment: Comment) => {
    if (!postComments) {
      return;
    }

    setPostComments([...postComments, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.title}</p>
      </section>

      {postComments && (
        <section className="PostDetails__comments">
          {postComments.length > 0 && (
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentsShown(!isCommentsShown)}
            >
              {`${isCommentsShown ? 'Hide' : 'Show'} ${
                postComments.length
              } comments`}
            </button>
          )}

          {isCommentsShown && (
            <ul className="PostDetails__list">
              {postComments?.map(({ id, body }) => (
                <li key={id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(id)}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

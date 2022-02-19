import { useEffect, useState } from 'react';
import { deleteComment, getComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const loadPost = async () => {
    const postFromServer = await getPostDetails(postId);

    setPost(postFromServer);
  };

  const loadComments = async () => {
    const commentsFromServer = await getComments(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const removeComment = async (commentId: number) => {
    await deleteComment(commentId);
    loadComments();
  };

  const changeCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="PostDetails">
      <h2>
        Post details:
      </h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={changeCommentsVisibility}
        >
          {isCommentsVisible ? 'Close Comments' : 'Open comments'}
        </button>

        {isCommentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};

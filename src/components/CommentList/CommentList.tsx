import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { usePosts } from '../../PostsContext';
import { deleteComment } from '../../services/postService';

type Props = {
  setIsDeleteError: (e: boolean) => void;
};

export const CommentList: React.FC<Props> = ({ setIsDeleteError }) => {
  const { postComments, setPostComments } = usePosts();

  const handleCommentDelete = (commentId: number) => {
    setIsDeleteError(false);
    const deletedComment = postComments
      .find(comment => comment.id === commentId);

    setPostComments(currComments => currComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .catch(() => {
        setIsDeleteError(true);
        if (deletedComment) {
          setPostComments(currComments => [...currComments, deletedComment]);
        }
      });
  };

  return (
    <>
      <p className="title is-4">Comments:</p>

      <TransitionGroup component={null}>
        {postComments.map(comment => (
          <CSSTransition key={comment.id} classNames="fade" timeout={300}>
            <article
              className="message is-small"
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

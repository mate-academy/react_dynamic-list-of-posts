import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';
import { addComment, getComments, removeComment } from '../../api/comments';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  selectedPost: Post,
}

export const PostDetails: FC<Props> = (props) => {
  const { selectedPost } = props;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const commentsFromServer = await getComments(selectedPost.id);

      setComments(commentsFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewComment = useCallback(
    async (newComment: CommentData) => {
      setIsLoading(true);

      try {
        const commentToAdd = {
          ...newComment,
          postId: selectedPost.id,
        };

        const comment = await addComment(commentToAdd);

        setComments(prevState => [...prevState, comment]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, [],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      try {
        setComments(prevState => {
          return prevState.filter(({ id }) => id !== commentId);
        });

        await removeComment(commentId);
      } catch {
        setIsError(true);
      }
    }, [],
  );

  const noComments = !comments.length && !isError && !isLoading;
  const isVisibleButton = !isFormVisible && !isError && !isLoading;

  useEffect(() => {
    fetchComments();
    setIsFormVisible(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {noComments && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <p className="title is-4">
              Comments:
            </p>
          )}

          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
            />
          ))}

          {isVisibleButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            onAddComment={addNewComment}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

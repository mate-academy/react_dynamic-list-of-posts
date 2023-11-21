import { useContext, useEffect, useState } from 'react';
import { CommentItem } from './CommentItem';
import { getComments } from '../api/comments';
import { ListContext } from './ListContext';
import { Loader } from './Loader';
import { WriteCommentButton } from './WriteCommmentButton';

export const CommentsList: React.FC = () => {
  const {
    selectedPost,
    comments,
    setComments,
    isErrorComment,
    setIsErrorComment,
  } = useContext(ListContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsErrorComment(false);

    getComments(selectedPost.id).then(commentsFromServer => {
      setComments(commentsFromServer);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
        setIsErrorComment(true);
        setComments([]);
      });
  }, [selectedPost, setComments, setIsErrorComment]);

  if (isLoading) {
    return (
      <div className="block">
        <Loader />
      </div>
    );
  }

  if (isErrorComment) {
    return (
      <div className="block">
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      </div>
    );
  }

  if (!comments?.length) {
    return (
      <div className="block">
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>

        <WriteCommentButton />
      </div>
    );
  }

  return (
    <div className="block">
      <p className="title is-4">Comments:</p>

      {comments?.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}

      <WriteCommentButton />
    </div>
  );
};

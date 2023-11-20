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
  }, [selectedPost]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isErrorComment) {
    content = (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  } else if (comments?.length === 0) {
    content = (
      <>
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>

        <WriteCommentButton />
      </>

    );
  } else {
    content = (
      <>
        <p className="title is-4">Comments:</p>

        {comments?.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}

        <WriteCommentButton />
      </>
    );
  }

  return (
    <div className="block">
      {content}
    </div>
  );
};

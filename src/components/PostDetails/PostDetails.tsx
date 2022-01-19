import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/post';
import { CommentsList } from '../CommentsList';
import { ForComment } from '../../Types/Comment';
import { createCommemt, deleteComment } from '../../api/comment';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<ForComment[]>([]);
  const [hiddenComments, setHiddenComments] = useState(false);

  const fetchDetails = async () => {
    if (postId > 0) {
      const detailsFromServer = await getPostDetails(postId);

      setComments(detailsFromServer);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [postId]);

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setComments((preComments: ForComment[]) => preComments
      .filter(preComment => preComment.id !== commentId));
  };

  const addComment = (name: string, email: string, body: string) => {
    createCommemt(postId, name, email, body)
      .then(() => getPostDetails(postId)
        .then(result => setComments(result)));
  };

  return (
    <div className="PostDetails">
      <h2>
        Post details:
      </h2>

      <section className="PostDetails__post">
        <p>sunt aut facere repellat provident occaecati excepturi optio</p>
      </section>

      <section
        className={classNames('PostDetails__comments', { 'PostDetails__comments--m-b': !hiddenComments })}
      >
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setHiddenComments(!hiddenComments)}
          >
            Hide
            {' '}
            {comments.length}
            {' '}
            comments
          </button>
        )}
        {hiddenComments && (
          <CommentsList
            comments={comments}
            removeComment={removeComment}
          />
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

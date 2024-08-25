import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { SelectedPostContext } from '../providers/PostProvider';
import { getComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

export const PostDetails: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnCommentsLoad, setIsErrorOnCommentsLoad] = useState(false);
  const [isAddingForm, setIsAddingForm] = useState(false);

  const { selectedPost } = useContext(SelectedPostContext);

  const { id, title, body } = selectedPost || {};

  const isNoComments = !isLoading && !isErrorOnCommentsLoad && !comments.length;

  const isCommentsShow =
    !isLoading && !isErrorOnCommentsLoad && !!comments.length;

  const isButtonShow = !isAddingForm && !isErrorOnCommentsLoad && !isLoading;

  useEffect(() => {
    setIsAddingForm(false);
    if (selectedPost) {
      setIsLoading(true);

      getComments(selectedPost.id)
        .then(loadedComments => {
          setComments(loadedComments);
        })
        .catch(() => {
          setIsErrorOnCommentsLoad(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && isErrorOnCommentsLoad && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsShow && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comments={comments}
                  comment={comment}
                  setComments={setComments}
                />
              ))}
            </>
          )}
        </div>

        {isButtonShow && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsAddingForm(true)}
          >
            Write a comment
          </button>
        )}

        {isAddingForm && <NewCommentForm setComments={setComments} />}
      </div>
    </div>
  );
};

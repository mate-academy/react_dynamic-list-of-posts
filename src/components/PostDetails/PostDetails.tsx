import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { addComment, getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { NewComment } from '../../types/NewComment';

type Props = {
  selectedPostId: number | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  const handleVisibilityComments = useCallback(() => {
    setIsVisibleComments(!isVisibleComments);
  }, [isVisibleComments]);

  const postDetails = useCallback(async () => {
    if (selectedPostId) {
      try {
        setIsDetailsLoading(true);
        const [userPostDetails, userPostComments] = await Promise.all([
          getPostDetails(selectedPostId),
          getPostComments(selectedPostId),
        ]);

        setDetails(userPostDetails);
        setComments(userPostComments);
      } finally {
        setIsDetailsLoading(false);
      }
    } else {
      setDetails(null);
      setComments(null);
    }
  }, [selectedPostId]);

  const updateComments = useCallback(async () => {
    if (selectedPostId) {
      const userPostComments = await getPostComments(selectedPostId);

      setComments(userPostComments);
    }
  }, [selectedPostId]);

  const handleRemoveComment = useCallback(async (commentId: number) => {
    try {
      setIsCommentsLoading(true);
      await removeComment(commentId);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  }, [selectedPostId, comments]);

  const handleAddComment = useCallback(async (newComment: NewComment) => {
    try {
      setIsCommentsLoading(true);
      await addComment(newComment);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  }, [selectedPostId, comments]);

  const isComments = useMemo(() => {
    return comments && comments.length > 0;
  }, [comments]);

  useEffect(() => {
    postDetails();
  }, [selectedPostId]);

  return (
    <>
      <div className="PostDetails">
        <h2>Post details:</h2>
        {isDetailsLoading && <Loader />}
        {!isDetailsLoading && (
          <>
            <section className="PostDetails__post">
              <p>{details?.body}</p>
            </section>

            <section className="PostDetails__comments">
              {details?.body && !isComments && (
                <button
                  type="button"
                  className="PostDetails__nocomments
                  button"
                >
                  No comments
                </button>
              )}

              {details?.body && isComments && (
                <button
                  type="button"
                  className="button"
                  onClick={handleVisibilityComments}
                >
                  {isVisibleComments && `Hide ${comments?.length} comments`}
                  {!isVisibleComments && `Show ${comments?.length} comments`}
                </button>
              )}

              {isCommentsLoading && <Loader />}
              {!isCommentsLoading && (
                <ul className="PostDetails__list" data-cy="postDetails">
                  {isVisibleComments && comments?.map((comment) => (
                    <li
                      className="PostDetails__list-item"
                      key={comment.id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleRemoveComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            {details?.body && (
              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm
                    handleAddComment={handleAddComment}
                    selectedPostId={selectedPostId}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

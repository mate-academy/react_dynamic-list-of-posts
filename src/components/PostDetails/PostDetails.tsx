import React, { useEffect, useMemo, useState } from 'react';
import { addComment, getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';
import { NewComment } from '../../types/NewComment';

interface Props {
  selectedPostId: number | null,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const handleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const postDetails = async () => {
    if (selectedPostId) {
      try {
        setIsDetailsLoaded(true);

        const [userPostDetails, userPostComments] = await Promise.all([
          getPostDetails(selectedPostId),
          getPostComments(selectedPostId),
        ]);

        setDetails(userPostDetails);
        setComments(userPostComments);
      } finally {
        setIsDetailsLoaded(false);
      }
    } else {
      setDetails(null);
      setComments(null);
    }
  };

  useEffect(() => {
    postDetails();
  }, [selectedPostId]);

  const updateComments = () => {
    if (selectedPostId) {
      getPostComments(selectedPostId)
        .then(response => setComments(response));
    }
  };

  const handleRemoveComment = async (commentId: number) => {
    try {
      setIsCommentsLoading(true);
      await removeComment(commentId);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  };

  const handleAddComment = async (newComment: NewComment) => {
    try {
      setIsCommentsLoading(true);
      await addComment(newComment);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  };

  const isComments = useMemo(() => {
    return comments && comments.length > 0;
  }, [comments]);

  const showCommentsButton = () => {
    const length = comments?.length;
    const condition = `${length} ${length === 1 ? 'comment' : 'comments'}`;

    if (isCommentsVisible) {
      return `Hide ${condition}`;
    }

    return `Show ${condition}`;
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {isDetailsLoaded && <Loader />}
      {!isDetailsLoaded && (
        <>
          <section className="PostDetails__post">
            <p>{details?.body}</p>
          </section>

          <section className="PostDetails__comments">
            {details?.body && !isComments && (
              <button
                type="button"
                className="button PostDetails__nocomments"
              >
                No comments
              </button>
            )}

            {details?.body && isComments && (
              <button
                type="button"
                className="button"
                onClick={handleCommentsVisibility}
              >
                {showCommentsButton()}
              </button>
            )}

            {isCommentsLoading && <Loader />}
            {!isCommentsLoading && (
              <ul
                className="PostDetails__list"
                data-cy="postDetails"
              >
                {isCommentsVisible && comments?.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
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
  );
};

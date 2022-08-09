import React, { useEffect, useState, useCallback } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { Post, Comment } from '../../react-app-env';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [findPost, setFindPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment []>([]);
  const [visibleComments, setVisibleComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postDetails => setFindPost(postDetails));
    setVisibleComments(false);
    setCommentsError(false);
  }, [selectedPostId]);

  const getAllComments = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    if (commentsFromServer.length === 0) {
      setComments([]);
      setCommentsError(true);
    } else {
      setComments(commentsFromServer);
      setCommentsError(false);
    }
  };

  const showComments = () => {
    if (visibleComments) {
      setComments([]);
      setVisibleComments(false);
      setCommentsError(false);
    } else {
      getAllComments();
      setVisibleComments(true);
    }
  };

  const deleteComment = useCallback(async (deleteId: number) => {
    await deletePostComment(deleteId);
    const filteredComments = [...comments].filter(
      comment => comment.id !== deleteId,
    );

    setComments(filteredComments);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{findPost?.body}</p>
      </section>

      {findPost ? (
        <section
          className="PostDetails__comments"
          data-cy="postDetails"
        >
          <button
            type="button"
            className="button"
            onClick={() => showComments()}
          >
            {visibleComments ? 'Hide comments' : 'Show comments'}
          </button>
          {visibleComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    onClick={() => deleteComment(comment.id)}
                    className="PostDetails__remove-button button"
                  >
                    X
                  </button>
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <Loader />
      )}

      {commentsError && (
        <p className="PostDetails__comments--notFound">
          There are no comments yet.
        </p>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedId={selectedPostId}
            setComments={getAllComments}
          />
        </div>
      </section>
    </div>
  );
};

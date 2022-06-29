import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/post';
import { getPostComments, deleteComment } from '../../api/comments';
import { Post, Comment } from '../../react-app-env';
import './PostDetails.scss';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [findPost, setFindPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
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

  const clickDelete = async (commentId: number) => {
    await deleteComment(commentId);
    const updateComments = await getPostComments(selectedPostId);

    setComments(updateComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{findPost?.body}</p>
      </section>

      {findPost ? (
        <section className="PostDetails__comments" data-cy="postDetails">
          <button
            type="button"
            onClick={() => showComments()}
            className="button"
          >
            {visibleComments ? 'Hide comments' : 'Show comments'}
          </button>

          {visibleComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    onClick={() => clickDelete(comment.id)}
                    className="PostDetails__remove-button button"
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
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
          There are no comments yet &#9785;
        </p>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            setComments={getAllComments}
          />
        </div>
      </section>
    </div>
  );
};

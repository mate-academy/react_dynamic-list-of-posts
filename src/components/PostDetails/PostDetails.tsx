import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [postInfo, setPostInfo] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments[] | null>(null);
  const [visibleComments, setVisibleComments] = useState(true);

  const commentsFromServer = (id: number | null) => {
    getPostComments(id)
      .then(comment => setComments(comment))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(post => setPostInfo(post))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));

    commentsFromServer(selectedPostId);
  }, [selectedPostId]);

  const deleteComments = (id: number) => {
    deleteComment(id);
    setComments(comments && comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postInfo?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            if (comments?.length !== 0) {
              setVisibleComments(!visibleComments);
            }
          }}
        >
          {`${visibleComments ? 'Hide ' : 'Show '}${comments?.length} comments`}
        </button>

        {visibleComments
        && (
          <ul className="PostDetails__list">
            {comments?.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    comment.id
                    && deleteComments(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            setComments={setComments}
            comments={comments}
          />
        </div>
      </section>
    </div>
  );
};

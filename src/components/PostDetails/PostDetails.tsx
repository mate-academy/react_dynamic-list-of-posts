import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

type Props = {
  selectedPostId: number;
};
export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [visibilityComment, setVisibilityComment] = useState(true);

  const commentsFromServer = (id: number | null) => {
    getPostComments(id)
      .then(result => setComments(result))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setPost(result))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
    commentsFromServer(selectedPostId);
  }, [selectedPostId]);

  const removeComments = (id: number) => {
    deleteComment(id);
    setComments(comments && comments.filter(com => com.id !== id));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            if (comments?.length !== 0) {
              setVisibilityComment(!visibilityComment);
            }
          }}
        >
          {`${visibilityComment ? 'Hide' : 'Show'} ${comments?.length} comments`}
        </button>

        {visibilityComment
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
                      if (comment.id) {
                        removeComments(comment.id);
                      }
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
            comments={comments}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

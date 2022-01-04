import React, { useEffect, useState } from 'react';
import { getPostComments, postComment, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibility, setVisibility] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postDetails => {
        setDetails(postDetails);
        setLoadingStatus(false);
      });

    getPostComments(selectedPostId)
      .then(postComments => setComments([...postComments]));
  }, [selectedPostId]);

  const deleteComment = (commentId: number) => {
    removeComment(commentId)
      .then(res => {
        if (res) {
          setComments(current => current.filter(comment => comment.id !== commentId));
        }
      });
  };

  const addComment = (comment: Partial<Comment>) => {
    postComment(comment)
      .then(res => setComments([...comments, res]));
  };

  if (loadingStatus) {
    return (<Loader />);
  }

  return (
    <div className="PostDetails">
      <h2>
        {`Post details: ${comments.length}`}
      </h2>

      <section className="PostDetails__post">
        <p>{details?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setVisibility(current => !current)}
            >
              {visibility
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {visibility && comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>

                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3>There is no comments!</h3>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};

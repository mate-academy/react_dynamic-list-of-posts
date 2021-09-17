import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { addComment, deleteComment, getPostComments, getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [post, setPost] = useState({} as Post | null);
  const [comments, setComments] = useState([] as Comment[]);
  const [isCommentsVisible, setIsCommentVisible] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    getPostDetails(selectedPostId)
      .then(response => setPost(response));

    getPostComments(selectedPostId)
      .then(response => {
        setComments(response);
        setLoader(false);
      });
  }, [selectedPostId]);

  const addNewComment = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => getPostComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  const hideTriggerComments = () => {
    setIsCommentVisible(!isCommentsVisible);
  };

  if (loader) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button mb-5"
          onClick={() => hideTriggerComments()}
        >
          {isCommentsVisible ? 'Hide ' : 'Show '}
          {`${comments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isCommentsVisible && (
            <>
              {comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

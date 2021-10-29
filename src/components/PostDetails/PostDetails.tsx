import { FC, useEffect, useState } from 'react';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, postComment, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  postId: number,
};

export const PostDetails: FC<Props> = ({ postId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsVisibility, setCommentsVisibility] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(postDetails => {
        setDetails(postDetails);
        setIsLoaded(true);
      });

    getPostComments(postId)
      .then(postComments => setComments([...postComments]));
  }, [postId]);

  const onDelete = (commentId: number) => {
    removeComment(commentId)
      .then(response => {
        if (response) {
          setComments(prevComments => prevComments
            .filter(prevComment => prevComment.id !== commentId));
        }
      });
  };

  const onAdd = (newComment: Partial<Comment>) => {
    postComment(newComment)
      .then(response => setComments([...comments, response]));
  };

  if (!isLoaded) {
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
              onClick={() => (setCommentsVisibility(!commentsVisibility))}
            >
              {commentsVisibility
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {commentsVisibility && comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => onDelete(comment.id)}
                  >
                    x
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3>Comment section is empty :(</h3>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            addComment={onAdd}
          />
        </div>
      </section>
    </div>
  );
};

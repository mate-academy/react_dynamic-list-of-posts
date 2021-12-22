import { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';
import { remove, add } from '../../api/api';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [commentsIsvisible, setCommentsIsvisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteComment = (postId: number) => {
    remove(`/comments/${postId}`);
    setComments(comments.filter(el => el.id !== postId));
  };

  const addComment = (name:string, email:string, body:string) => {
    const option = {
      id: comments.length + 1,
      postId: selectedId,
      name,
      email,
      body,
    };

    add('/comments', option);
    setComments([...comments, option]);
  };

  useEffect(() => {
    getPostDetails(selectedId)
      .then(data => {
        setDetails(data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Ooops, something went wrong');
      });
  }, [selectedId]);

  useEffect(() => {
    getPostComments(selectedId)
      .then(data => {
        setComments(data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Ooops, something went wrong');
      });
  }, [selectedId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {errorMessage}
      {details && (
        <section className="PostDetails__post">
          <p>{details.body}</p>
        </section>
      )}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsIsvisible(!commentsIsvisible)}
        >
          {commentsIsvisible
            ? ('Hide') : ('Show')}
          {` ${comments.length} comments`}
        </button>

        {commentsIsvisible && (
          <ul className="PostDetails__list">
            {comments.map(el => (
              <li className="PostDetails__list-item" key={el.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(el.id)}
                >
                  X
                </button>
                <p>{el.name}</p>
                <p>{el.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

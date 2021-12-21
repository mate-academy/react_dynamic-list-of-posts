import { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';
import { remove } from '../../api/api';

type Props = {
  selectedId: number,
};

const post = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
  createdAt: '',
  updatedAt: '',
};

const comment = {
  id: 0,
  postId: 0,
  name: '',
  email: '',
  body: '',
};

export const PostDetails: React.FC<Props> = ({ selectedId }) => {
  const [details, setDetails] = useState(post);
  const [comments, setComments] = useState([comment]);
  const [commentsIsvisible, setCommentsIsvisible] = useState(true);

  const deletePost = (postId: number) => {
    return remove(`/comments/${postId}`);
  };

  useEffect(() => {
    getPostDetails(selectedId)
      .then(data => {
        setDetails(data);
      });
  }, [selectedId]);

  useEffect(() => {
    getPostComments(selectedId)
      .then(data => {
        setComments(data);
      });
  }, [selectedId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsIsvisible(!commentsIsvisible)}
        >
          {commentsIsvisible ? (`Hide ${comments.length} comments`) : (`Show ${comments.length} comments`)}
        </button>

        {commentsIsvisible && (
          <ul className="PostDetails__list">
            {comments.map(el => (
              <li className="PostDetails__list-item" key={el.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deletePost(el.id)}
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
          <NewCommentForm selectedId={selectedId} id={comments.length + 1} />
        </div>
      </section>
    </div>
  );
};

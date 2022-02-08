import React from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  detail: string;
  comm: Post[];
  hide: boolean;
  handleButtonHide: () => void;
  deleteComm: (id: number) => Promise<void>;
  testId: number;
  fetchComments: () => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  detail,
  comm,
  hide,
  handleButtonHide,
  deleteComm,
  testId,
  fetchComments,
}) => (
  <div className="PostDetails">
    <h2>Post details:</h2>

    <section className="PostDetails__post">
      <p>{detail}</p>
    </section>

    <section className="PostDetails__comments">
      <button
        type="button"
        className="button button-visible"
        onClick={handleButtonHide}
      >
        Hide 2 comments
      </button>

      <ul
        className={hide ? 'PostDetails__list' : 'PostDetails__list--hide'}
      >
        {comm.map(e => (
          <li key={e.id} className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
              onClick={() => deleteComm(e.id)}
            >
              X
            </button>
            <p>{e.body}</p>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <div className="PostDetails__form-wrapper">
        <NewCommentForm
          fetchComments={fetchComments}
          testId={testId}
        />
      </div>
    </section>
  </div>
);

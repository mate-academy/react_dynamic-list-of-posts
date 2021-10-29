import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './PostDetails.scss';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { getPostComments, deletePostComment, postPostComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postDetails: Post,
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({
  postDetails,
  selectedPostId,
}) => {
  const [comments, setComments] = useState([] as Comment[]);
  const [commentsToggler, setCommentsToggler] = useState(false);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(commentsReceived => {
        setComments(commentsReceived);
      });
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setCommentsToggler(!commentsToggler);
          }}
        >
          {commentsToggler ? 'Show comments' : 'Hide comments'}
        </button>

        <ul className={classNames({
          PostDetails__list: true,
          'PostDetails__list--hide': commentsToggler,
        })}
        >
          {comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                value={comment.id}
                className="PostDetails__remove-button button"
                onClick={(event) => {
                  deletePostComment(+event.currentTarget.value)
                    .then(() => {
                      getPostComments(selectedPostId)
                        .then(commentsReceived => {
                          setComments(commentsReceived);
                        });
                    });
                }}
              >
                X
              </button>
              <p>
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            postComment={(comment) => {
              postPostComment(comment)
                .then((addedComment) => {
                  setComments(prev => [...prev, addedComment]);
                });
            }}
          />
        </div>
      </section>
    </div>
  );
};

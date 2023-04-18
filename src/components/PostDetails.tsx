import React from 'react';
// import { Loader } from './Loader';
// import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  commentsList: Comment[],
};

export const PostDetails: React.FC<Props> = (
  {
    selectedPost,
    commentsList,
  },
) => {
  const {
    id,
    title,
    body,
  } = selectedPost;

  const visibleCommentsList = commentsList.length;

  return (
    <div className="tile is-child box is-success ">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>
        {!visibleCommentsList
          ? (
            <div className="block">
              <p
                className="title is-4"
                data-cy="NoCommentsMessage"
              >
                No comments yet
              </p>
            </div>
          )
          : commentsList.map(comment => (
            <div
              key={comment.id}
              className="block"
            >
              <p className="title is-4">Comments:</p>
              <article
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href="mailto:fgh"
                    data-cy="CommentAuthor"
                  >
                    {comment.body}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>
                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  fgh
                </div>
              </article>

            </div>
          ))}

        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
        >
          Write a comment
        </button>

      </div>
    </div>
  );
};

import React from "react"
import { Comment } from "../../types/Comment"

type Props = {
    comment: Comment
    handleClickComment: (commentPost: Comment) => void
}

export const CommentItem: React.FC<Props> = ({comment, handleClickComment}) => {
    return (
        <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => handleClickComment(comment)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
    )
}
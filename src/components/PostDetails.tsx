import React, { useContext, useState } from 'react';
import * as commentsService from '../api/comments';
import { Post } from '../types/Post';
import { CommentsContext } from './CommentsContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostsContext } from './PostsContext';

export const PostDetails: React.FC = () => {
  const { post } = useContext(PostsContext);
  const { comments, setComments, currently } = useContext(CommentsContext);
  const [isNewComentOpen, setIsNewCommentOpen] = useState(false);
  const getKey = (i: number, type: string) => `${type}${i}`;

  const deleteComment = (id: number) => {
    setComments(prev => prev.filter(com => com.id !== id));
    commentsService.remove(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            { post?.body }
          </p>
        </div>

        <div className="block">
          {currently === 'loading' && <Loader />}

          {currently === 'serverError' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {currently === 'noComments' && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {currently === 'active' && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body.split('\n').map((line, i) => (
                      <p key={getKey(i, 'line')}>{line}</p>
                    ))}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isNewComentOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isNewComentOpen && <NewCommentForm post={post as Post} />}
      </div>
    </div>
  );
};

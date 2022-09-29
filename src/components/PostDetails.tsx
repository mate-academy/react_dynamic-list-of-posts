import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
  openNewComment: boolean;
  setOpenNewComment: (openNewComment: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  openNewComment,
  setOpenNewComment,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasErrorComment, setHarErrorComment] = useState(false);
  const [load, setLoad] = useState(false);

  const loadComments = async () => {
    setLoad(true);
    const getComments = await client.get<Comment[]>(`/comments?postId=${post?.id}`);

    try {
      setComments(getComments);
    } catch {
      setHarErrorComment(true);
    } finally {
      setLoad(false);
    }
  };

  const deleteComment = (comment: Comment) => {
    client.delete(`/comments/${comment.id}`);
    setComments(comments.filter(com => com.id !== comment.id));
  };

  useEffect(() => {
    loadComments();
  }, [post?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {load && <Loader />}
          {hasErrorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {comments.length === 0 && !load && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!load && (
            <>
              {comments.length > 0 && (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
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
                          onClick={() => deleteComment(comment)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
                </>
              )}
              {!openNewComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setOpenNewComment(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        { openNewComment && (
          <NewCommentForm post={post} setComments={setComments} />
        )}
      </div>
    </div>
  );
};

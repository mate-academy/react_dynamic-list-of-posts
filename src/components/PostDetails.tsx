import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as httpService from '../api/HttpClient';
import { Status } from '../types/Status';

interface Props {
  selectedPost: Post;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [activeWriteComment, setActiveWriteComment] = useState(false);

  const loadComments = async (postId: number) => {
    setStatus(Status.Loading);
    setActiveWriteComment(false);
    try {
      const commentsData: Comment[] =
        await httpService.getPostsComments(postId);

      setComments(commentsData);
      setStatus(Status.Success);
    } catch (error) {
      setStatus(Status.Error);
    }
  };

  const deleteComment = async (commentId: number) => {
    const copiedComments = [...comments];

    setComments((currentComments: Comment[]) => {
      return [...currentComments].filter(
        (comment: Comment) => comment.id !== commentId,
      );
    });
    try {
      await httpService.deleteComment(commentId);
    } catch {
      setComments(copiedComments);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost.id);
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {status === Status.Loading && <Loader />}

        {status === Status.Error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
            <button onClick={() => loadComments(selectedPost.id)}>Retry</button>
          </div>
        )}

        {status === Status.Success && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === Status.Success && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map((comment: Comment) => {
              return (
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
                    {comment.body}
                  </div>
                </article>
              );
            })}
          </>
        )}
        {status === Status.Success && !activeWriteComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setActiveWriteComment(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {activeWriteComment && status !== Status.Error && (
        <NewCommentForm
          selectedPost={selectedPost}
          status={status}
          setStatus={setStatus}
          setComments={setComments}
        />
      )}
    </div>
  );
};

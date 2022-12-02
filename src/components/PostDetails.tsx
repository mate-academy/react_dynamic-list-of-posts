import React, {
  useState,
  useEffect,
  memo,
  useCallback,
} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = memo(({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isNewCommentFormOpened, setIsNewCommentFormOpened] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      setHasLoadingError(false);

      try {
        const commentsFromServer: Comment[] = await client.get(`/comments?postId=${post.id}`);

        setIsLoadingComments(false);
        setComments(commentsFromServer);
      } catch (error) {
        setHasLoadingError(true);
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [post.id]);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    const deletedComment = await client.delete(`/comments/${commentId}`);

    if (deletedComment === 1) {
      setComments(prevComments => prevComments.filter(comment => {
        return comment.id !== commentId;
      }));
    }
  }, [comments]);

  const handleOpenNewCommentForm = useCallback(() => {
    setIsNewCommentFormOpened(true);
  }, [isNewCommentFormOpened]);

  useEffect(() => {
    setIsNewCommentFormOpened(false);
  }, [post]);

  const handleAddNewComment = useCallback((newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  }, [comments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (<Loader />)}

          {hasLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(
            comments.length === 0
            && post.id
            && !isLoadingComments
            && !hasLoadingError
          ) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length > 0 && !isLoadingComments)
          && (
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
                      onClick={() => handleDeleteComment(comment.id)}
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

          {(!hasLoadingError && !isNewCommentFormOpened) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => handleOpenNewCommentForm()}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentFormOpened && (
          <NewCommentForm
            comments={comments}
            onAdd={handleAddNewComment}
            postId={post.id}
          />
        )}
      </div>
    </div>
  );
});

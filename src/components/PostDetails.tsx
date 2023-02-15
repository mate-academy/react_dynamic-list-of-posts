import React, { useEffect, useMemo, useState } from 'react';
import { getComments, postComment, removeComment } from '../api/comments';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post | null,
  isAddingComment: boolean,
  setIsAddingComment: (value: boolean) => void,
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isAddingComment,
  setIsAddingComment,
}) => {
  const initialCommentData = {
    name: '',
    email: '',
    body: '',
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorComments, setIsErrorComments] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentData, setCommentData] = useState(initialCommentData);
  const [isRequired, setIsRequired] = useState(false);
  const errorName = useMemo(() => (
    Object.entries(commentData)
      .filter(el => el[1].length === 0)?.map(el => el[0])
  ), [commentData, isRequired]);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const loadComments = async (post: Post) => {
    setIsLoading(true);

    try {
      const loadedComments = await getComments(post.id);

      setComments(loadedComments);
    } catch {
      setIsErrorComments(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost);
    }
  }, [selectedPost]);

  const addComment = async () => {
    setIsPostingComment(true);
    try {
      if (selectedPost) {
        const newComment = await postComment(commentData, selectedPost.id);

        setComments(comments && [...comments, newComment]);
      }
    } catch (error) {
      throw new Error('error');
    } finally {
      setIsPostingComment(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await removeComment(commentId);
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleAdding = () => {
    setIsAddingComment(true);
  };

  const handleChange
  = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setCommentData(
      { ...commentData, [name]: value },
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRequired(true);
    if (errorName.length === 0) {
      addComment();
      setIsRequired(false);
      setCommentData({ ...commentData, body: '' });
    }
  };

  const handleClear = () => {
    setCommentData(initialCommentData);
    setIsRequired(false);
  };

  const handleDeletComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    const deletedIndex = comments?.findIndex(comment => comment.id === +id);

    const newComments = comments?.filter((_comment, i) => deletedIndex !== i);

    setComments(newComments as Comment[]);
    deleteComment(+id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isErrorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments?.map(comment => {
            const {
              id,
              name,
              email,
              body,
            } = comment;

            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={id}
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    id={`${id}`}
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={handleDeletComment}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            );
          })}

          {(!isAddingComment && !isLoading && !isErrorComments) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleAdding}
            >
              Write a comment
            </button>
          )}

        </div>

        {isAddingComment && (
          <NewCommentForm
            handleChange={handleChange}
            commentData={commentData}
            errorName={errorName}
            isRequired={isRequired}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            isPostingComment={isPostingComment}
          />
        )}
      </div>
    </div>
  );
};

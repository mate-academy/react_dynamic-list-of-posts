import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deletePostComment, getPostCommets } from '../api/Coments';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post | null;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [post, setPost] = useState<Post | null>(selectedPost);
  const [loader, setLoader] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');
    setPost(selectedPost);

    const fetchComments = async () => {
      setShowNewCommentForm(false);
      setErrorMessage('');

      if (selectedPost?.id) {
        try {
          const fComments = await getPostCommets(selectedPost.id);

          setPostComments(fComments || []);
        } catch (error) {
          setErrorMessage('Something went wrong!');
          setPostComments([]);
        } finally {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    };

    fetchComments();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setPostComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
      await deletePostComment(commentId);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {post && (
          <>
            <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
            <p data-cy="PostBody">{post.body}</p>
          </>
        )}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {loader && <Loader />}

        {!loader && postComments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {postComments.map(comment => (
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

        {!loader && postComments.length === 0 && !errorMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loader && !errorMessage && !showNewCommentForm ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowNewCommentForm(true)}
          >
            Write comment
          </button>
        ) : (
          <></>
        )}

        {!loader && !errorMessage && showNewCommentForm && (
          <NewCommentForm postId={post?.id} setPostComments={setPostComments} />
        )}
      </div>
    </div>
  );
};

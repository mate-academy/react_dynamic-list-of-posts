import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getPostById } from '../api/Posts';
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
  const [newCom, setNewCom] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedPost?.id) {
        setLoader(true);
        try {
          const fComments = await getPostCommets(selectedPost.id);

          setPostComments(fComments || []);
        } catch (error) {
          setErrorMessage('Something went wrong');
        } finally {
          setLoader(false);
        }
      }
    };

    fetchComments();
  }, [selectedPost?.id, newCom]);

  useEffect(() => {
    const fetchPost = async () => {
      if (selectedPost) {
        setLoader(true);
        try {
          const fPost = await getPostById(selectedPost.id);

          setPost(fPost || selectedPost);
        } catch (error) {
          setErrorMessage('Something went wrong');
        } finally {
          setLoader(false);
        }
      }
    };

    fetchPost();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deletePostComment(commentId);
      setPostComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (error) {
      setErrorMessage('Failed to delete comment');
    }
  };

  if (!post) {
    return (
      <div className="notification is-danger" data-cy="ErrorMessage">
        Post not found
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {loader && <Loader />}
        {post && (
          <>
            <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
            <p data-cy="PostBody">{post.body}</p>
          </>
        )}

        {errorMessage && (
          <div className="notification is-danger" data-cy="ErrorMessage">
            {errorMessage}
          </div>
        )}

        {postComments.length > 0 ? (
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
        ) : (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!showNewCommentForm ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowNewCommentForm(true)}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm
            postId={post.id}
            newCom={newCom}
            setNewCom={setNewCom}
          />
        )}
      </div>
    </div>
  );
};

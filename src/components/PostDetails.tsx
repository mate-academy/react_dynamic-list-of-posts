import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post;
};

interface NewComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [loadingComment, setLoadingComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorComment, setErrorComment] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {

    setIsOpenForm(false);

    async function selectedComments(url: string) {
      try {
        setLoadingComment(true);
        const res: Comment[] = await client.get<Comment[]>(url);

        setComments(res);
      } catch (e) {
        setErrorComment('Something went wrong');
      } finally {
        setLoadingComment(false);
      }
    }

    if (selectedPost) {
      selectedComments(`/comments?postId=${selectedPost?.id}`);
    }
  }, [selectedPost]);

  const deleteComment = async (commentID: number) => {
    try {
      client.delete(`/comments/${commentID}`);
    } catch (e) {
    } finally {
      setComments(prev => prev.filter(comment => comment.id !== commentID));
    }
  };

  const checkComments = () => {
    let content: React.ReactNode;

    if (loadingComment) {
      content = <Loader />;
    } else if (errorComment) {
      content = (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    } else if (comments.length === 0) {
      content = (
        <>
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
          {isOpenForm || (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </>
      );
    } else {
      content = (
        <>
          <p className="title is-4">Comments:</p>
          {comments?.map(comment => (
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
                  onClick={() => deleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>
              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
          {isOpenForm || (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </>
      );
    }

    return content;
  };

  const handleCommentCreated = (newComment: NewComment) => {
    setComments(prev => [...prev, newComment as Comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {selectedPost && checkComments()}
      </div>

      {isOpenForm && (
        <NewCommentForm
          selectedPostId={selectedPost.id}
          onCommentCreated={handleCommentCreated}
        />
      )}
    </div>
  );
};
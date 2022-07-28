import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  post: Post
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [showComments, setshowComments] = useState(false);
  const [newComment, setNewComment] = useState<Comments | null>(null);

  const addCommentToList = (name:string, email:string, body:string) => {
    const comment:Comments = {
      id: comments.length + 1,
      postId: post.id,
      name,
      email,
      body,
    };

    setNewComment(comment);
  };

  const upLoadComents = async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    upLoadComents(+post.id);
  }, [comments]);

  useEffect(() => {
    if (newComment) {
      addComment(newComment);
    }
  }, [newComment]);

  return (
    <div className="PostDetails" data-cy="postDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setshowComments(state => !state);
          }}
        >
          {
            showComments
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`
          }
        </button>

        <ul className="PostDetails__list">
          {showComments && (
            comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          )}
        </ul>

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addCommentToList} />
        </div>
      </section>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

import './PostDetails.scss';

import { addPostComments, deletePostComments, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>({} as Post);
  const [commets, setComments] = useState<PostComment[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(posts => {
        setPost(posts);
        setLoading(false);
      });

    getPostComments(postId)
      .then(comments => setComments([...comments]));
  }, [postId]);

  const deleteComment = (commentId: number) => {
    deletePostComments(commentId);

    setComments(current => current.filter(({ id }) => commentId !== id));
  };

  const addComment = async (comment: Partial<PostComment>) => {
    const newComment = await addPostComments(comment);

    setComments(current => [newComment, ...current]);
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2>{`Post details:${commets.length}`}</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {commets.length ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setHidden(current => !current)}
            >
              {`${hidden ? 'Show comments' : 'Hide comments'}`}
            </button>

            <ul className="PostDetails__list">
              {!hidden && commets.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>There is no comments!</p>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};

import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

type Props = {
  postId: number,
  onCommentsSet: Dispatch<SetStateAction<Comment[]>>,
  comments: Comment[],
};

export const PostDetails: React.FC<Props> = ({
  postId,
  onCommentsSet,
  comments,
}) => {
  const [isComment, setIsComment] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [removeText, setRemoveText] = useState(false);
  const [commentId, setCommentId] = useState(0);

  const fetchPosts = async () => {
    const posts = await getPostDetails(postId);

    setPost(posts);
  };

  const fetchComments = async () => {
    // If "X" Button clicked => remove comment

    if (removeText) {
      removeComment(commentId);
      const result = await getPostComments(postId);

      onCommentsSet(result);
    }

    const commentsArr = await getPostComments(postId);

    onCommentsSet(commentsArr);
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, [postId, commentId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <button
        type="button"
        className="button"
        onClick={() => {
          setIsComment(prev => !prev);
        }}
      >
        {!isComment ? 'Show' : 'Hide'}
        {' '}
        {comments.length < 1 ? null : comments.length}
        {' '}
        {comments.length === 1 ? 'comment' : 'comments'}
      </button>

      {isComment && (
        <section className="PostDetails__comments">

          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    setRemoveText(true);
                    setCommentId(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            name={name}
            email={email}
            comment={text}
            onSetName={setName}
            onSetEmail={setEmail}
            onSetComment={setText}
            onCommentsSet={onCommentsSet}
          />
        </div>
      </section>
    </div>
  );
};

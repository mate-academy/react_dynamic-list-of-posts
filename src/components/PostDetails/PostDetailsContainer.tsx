export const PostDetailsContainer: React.FC = ({ children }) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          {children}
        </div>
      </div>
    </div>
  );
};

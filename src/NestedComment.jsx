import React, { useState } from 'react';

const NestedComment = ({ comment, addReply, deleteComment, editComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(comment.message);
  const [showReplies, setShowReplies] = useState(true);

  const handleReply = () => setIsReplying(true);
  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText.trim());
      setIsReplying(false);
      setReplyText('');
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(comment.message);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editComment(comment.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="commentarea">
      <div className="commentheader">
        <strong>{comment.author}</strong> ·{" "}
        <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
      </div>

      {isEditing ? (
        <div className="reply">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="actionbar">
            <button className="sendreply" onClick={handleSaveEdit}>Save</button>
            <button className="cancelreply" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <p className="commenttext">
          {comment.parentId && <span className="arrow">↳</span>} {comment.message}
        </p>
      )}

      <div className="btncontainer">
        <button onClick={handleReply}>Reply</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => deleteComment(comment.id)}>Delete</button>
        {comment.children.length > 0 && (
          <button onClick={() => setShowReplies(prev => !prev)}>
            {showReplies ? "▼" : "▶"}
          </button>
        )}
      </div>

      {isReplying && (
        <div className="reply">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <div className="actionbar">
            <button className="sendreply" onClick={handleSendReply}>Send</button>
            <button className="cancelreply" onClick={handleCancelReply}>Cancel</button>
          </div>
        </div>
      )}

      {showReplies && comment.children.length > 0 && (
        <div className="comment">
          {comment.children.map((child) => (
            <NestedComment
              key={child.id}
              comment={child}
              addReply={addReply}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedComment;


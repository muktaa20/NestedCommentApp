import React, { useState } from 'react';
import NestedComment from './NestedComment';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      message: 'Hi, how are you?',
      children: [
        {
          id: 2,
          message: 'I am fine.',
          children: [],
        },
      ],
    },
    {
      id: 3,
      message: 'What is your name?',
      children: [],
    },
  ]);

  const createNewComment = (message) => ({
    id: Date.now(),
    message,
    children: [],
  });

  const addComment = () => {
    if (text.trim()) {
      setComments((prev) => [...prev, createNewComment(text.trim())]);
      setText('');
    }
  };

  const addReply = (parentId, replyMessage) => {
    const addReplyRecursively = (commentList) =>
      commentList.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            children: [createNewComment(replyMessage), ...comment.children],
          };
        }
        if (comment.children.length) {
          return {
            ...comment,
            children: addReplyRecursively(comment.children),
          };
        }
        return comment;
      });

    setComments((prev) => addReplyRecursively(prev));
  };

  const deleteComment = (commentId) => {
    const deleteRecursively = (commentList) =>
      commentList
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          children: deleteRecursively(comment.children),
        }));

    setComments((prev) => deleteRecursively(prev));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className="App">
      <h1>Nested Comment App</h1>

      <div className="commentbox">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
        />
        <button onClick={addComment}>Comment</button>
      </div>

      <div className="commentcontainer">
        {comments.map((comment) => (
          <NestedComment
            key={comment.id}
            comment={comment}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

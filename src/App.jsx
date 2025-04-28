import React, { useState } from 'react';
import NestedComment from './NestedComment';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      message: 'Hi, how are you?',
      author: 'User1',
      timestamp: Date.now(),
      parentId: null,
      children: [
        {
          id: 2,
          message: 'I am fine.',
          author: 'User2',
          timestamp: Date.now(),
          parentId: 1,
          children: [],
        },
      ],
    },
    {
      id: 3,
      message: 'What is your name?',
      author: 'User3',
      timestamp: Date.now(),
      parentId: null,
      children: [],
    },
  ]);

  const createNewComment = (message, parentId = null) => ({
    id: Date.now() + Math.random(),
    message,
    author: 'You',
    timestamp: Date.now(),
    parentId,
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
            children: [createNewComment(replyMessage, parentId), ...comment.children],
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

  const editComment = (commentId, newMessage) => {
    const editRecursively = (commentList) =>
      commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, message: newMessage };
        }
        return { ...comment, children: editRecursively(comment.children) };
      });

    setComments((prev) => editRecursively(prev));
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
            editComment={editComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;




// import React, { useState } from 'react';
// import NestedComment from './NestedComment';
// import './App.css';

// const App = () => {
//   const [text, setText] = useState('');
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       message: 'Hi, how are you?',
//       children: [
//         {
//           id: 2,
//           message: 'I am fine.',
//           children: [],
//         },
//       ],
//     },
//     {
//       id: 3,
//       message: 'What is your name?',
//       children: [],
//     },
//   ]);

//   const createNewComment = (message) => ({
//     id: Date.now(),
//     message,
//     children: [],
//   });

//   const addComment = () => {
//     if (text.trim()) {
//       setComments((prev) => [...prev, createNewComment(text.trim())]);
//       setText('');
//     }
//   };

//   const addReply = (parentId, replyMessage) => {
//     const addReplyRecursively = (commentList) =>
//       commentList.map((comment) => {
//         if (comment.id === parentId) {
//           return {
//             ...comment,
//             children: [createNewComment(replyMessage), ...comment.children],
//           };
//         }
//         if (comment.children.length) {
//           return {
//             ...comment,
//             children: addReplyRecursively(comment.children),
//           };
//         }
//         return comment;
//       });

//     setComments((prev) => addReplyRecursively(prev));
//   };

//   const deleteComment = (commentId) => {
//     const deleteRecursively = (commentList) =>
//       commentList
//         .filter((comment) => comment.id !== commentId)
//         .map((comment) => ({
//           ...comment,
//           children: deleteRecursively(comment.children),
//         }));

//     setComments((prev) => deleteRecursively(prev));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       addComment();
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Nested Comment App</h1>

//       <div className="commentbox">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Add a comment..."
//         />
//         <button onClick={addComment}>Comment</button>
//       </div>

//       <div className="commentcontainer">
//         {comments.map((comment) => (
//           <NestedComment
//             key={comment.id}
//             comment={comment}
//             addReply={addReply}
//             deleteComment={deleteComment}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

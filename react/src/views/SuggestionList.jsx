import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
// import './CommentList.css';

export default function SuggestionList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/comments')
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="comment-list">
      <center><strong className="comments-heading">Suggestions :)</strong></center><br></br><br></br>
      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <li key={comment.id} className="comment-item">
              <div className="message-box">
                <div className="message-header">
                  Suggestion #{comment.id}
                </div>
                <div className="message-content">
                  <p>{comment.suggestion}</p>
                </div>
                <div className="comment-actions">
                  <span>{comment.created_at}</span>
                  <button>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
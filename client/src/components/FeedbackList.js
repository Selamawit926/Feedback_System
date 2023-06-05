import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedback List</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p>Name: {feedback.name}</p>
            <p>Email: {feedback.email}</p>
            <p>Comments: {feedback.comments}</p>
            {feedback.file && <a href={feedback.file} target="_blank" rel="noreferrer">Download File</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;

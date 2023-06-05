import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('comments', comments);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('/api/feedback', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error.response.data); // Handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Feedback</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="comments" className="form-label">Comments:</label>
        <textarea className="form-control" id="comments" value={comments} onChange={(e) => setComments(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">File (optional):</label>
        <input type="file" className="form-control" id="file" onChange={handleFileChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FeedbackForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';

const FeedbackList = () => {
  const { userId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedbacks'); // Replace with your API endpoint for fetching feedbacks
      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
    setShowModal(false);
  };

  const editFeedback = (feedback) => {
    setEditingFeedback(feedback);
    setComment(feedback.comment);
    setShowModal(true);
  };

  const saveEditedFeedback = () => {
    // Handle saving edited feedback logic here
    // ...

    // Clear form fields and close modal
    setComment('');
    setPdfFile(null);
    setShowModal(false);
  };

  // Get current feedbacks
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Feedback List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>
                <button className="link-button" onClick={() => openModal(feedback)}>
                  {feedback.title}
                </button>
              </td>
              <td>{feedback.date}</td>
              <td>
                <Button variant="primary" onClick={() => editFeedback(feedback)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={feedbacks.length} onPageChange={handlePageChange} />

      {/* Feedback Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFeedback?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedFeedback?.comment}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Form Modal */}
      <Modal show={editingFeedback !== null} onHide={() => setEditingFeedback(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="pdfFile">
              <Form.Label>PDF File</Form.Label>
              <Form.Control type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingFeedback(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEditedFeedback}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedbackList;

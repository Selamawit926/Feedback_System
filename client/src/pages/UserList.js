import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Pagination from './Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Replace with your API endpoint for fetching users
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const disableUser = async () => {
    try {
      await axios.put(`/api/users/${selectedUser.id}/disable`); // Replace with your API endpoint for disabling a user
      fetchUsers(); // Fetch updated user list
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  // Get current users
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <button className="btn btn-link" onClick={() => window.location.href = `/feedbacks/${user.id}`}>{user.name}</button>
              </td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => openModal(user)}>
                  Disable
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={users.length} onPageChange={handlePageChange} />

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Disable User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to disable the account for user: {selectedUser?.name} ({selectedUser?.email})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={disableUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;

import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade } from '@mui/material';
import './RepositoryDetails.css';

function RepositoryDetails({ repo }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShow} className="button-details"> 
        Details
      </Button>
      <Modal
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        className="modal"
      >
        <Fade in={showModal}>
          <div className="modal-paper">
            <h2 className="modal-title">Repository Details</h2>
            <p>Watchers: {repo?.watchers?.totalCount}</p>
            <p>Forks: {repo?.forks?.totalCount}</p>
            <p>Stars: {repo?.stargazers?.totalCount}</p>
            <p>Languages:</p>
            <ul>
              {repo?.languages?.edges?.map((edge, index) => (
                <li key={index}>{edge?.node?.name}</li>
              ))}
            </ul>
            <Button variant="contained" color="secondary" onClick={handleClose} className="modal-footer"> 
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default RepositoryDetails;

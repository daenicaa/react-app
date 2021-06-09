import React from 'react'

function Modal(){
    return (
        <div className="modal">
          <div className="modal-container">
            <p>Do you want to Logout?</p>
            <div className="modal-button">
              <button className="yes-btn">Yes</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
    )
}

export default Modal;

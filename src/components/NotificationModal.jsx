import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const NotificationModal = ({ message, onClose, show }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center p-4">
          {/* Close button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Icon */}
          <div className="mb-3 text-success" style={{ fontSize: "3rem" }}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>

          {/* Title */}
          <h5 className="mb-2 text-primary">Message Sent!</h5>

          {/* Message */}
          <p className="mb-0">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

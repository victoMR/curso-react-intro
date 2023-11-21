import React, { useState } from "react";
import Modal from "react-modal";
import "./ToDoItems.css";
import { FaCheck, FaTimes } from "react-icons/fa";

function ToDoItem(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDescription, setNewDescription] = useState(props.description);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSaveDescription = () => {
    props.onSaveDescription(props.text, newDescription);
    closeModal();
  };

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        onClick={props.onComplete}
      >
        <FaCheck />
      </span>
      <p
        className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}
        onClick={openModal}
      >
        {props.text}
      </p>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Description Modal"
        className="Modal"
        overlayClassName="Overlay1"
      >
        <div className="modal-content1">
          <h1 className="ModalTitle">Notas de la tarea</h1>
          <textarea
            className="DescriptionInput"
            placeholder="Ingresa una descripción"
            value={newDescription}
            onChange={handleDescriptionChange}
          />
          <button
            className="btnSave Icon Icon-check"
            onClick={handleSaveDescription}
          >
            <FaCheck />
          </button>
          <button className="btnClose" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
      </Modal>
      <span className="Icon Icon-delete" onClick={props.onDelete}>
        <FaTimes />
      </span>
    </li>
  );
}

export { ToDoItem };

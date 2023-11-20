import React, { useState } from "react";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import "./CreateToDoButton.css";

function CreateToDoButton({ onCreateToDo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleCreateToDo = () => {
    onCreateToDo(newTodoText);
    setNewTodoText("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <button id="btnAdd" onClick={() => setIsModalOpen(true)}>
        <FaPlus />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Todo"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <input
            type="text"
            className="input-text"
            placeholder="Ingresa tu nuevo TODO"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button className="btnAddModal" onClick={handleCreateToDo}>Añadir</button>
        </div>
      </Modal>
    </div>
  );
}

export { CreateToDoButton };

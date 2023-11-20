import React from "react";
import './ToDoItems.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

function ToDoItem(props) {
  return (
    <li className="TodoItem">
      <span className={`Icon Icon-check ${props.completed && "Icon-check--active"} `}
      onClick={props.onComplete}>
        <FaCheck />
      </span>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <span className="Icon Icon-delete"
      onClick={props.onDelete}>
        <FaTimes />
      </span>
    </li>
  );
}

export { ToDoItem };
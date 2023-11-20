import "./TodoCounter.css";

function ToDoCounter({ total, completed }) {
  let message = `Has completado <span>${completed}</span> de <span>${total}</span> TODOs`;

  if (total === completed) {
    message = "¡Felicidades! Has completado todas tus tareas 🎉   ";
  }

  return <h1 className="TodoCounter" dangerouslySetInnerHTML={{ __html: message }} />;
}

export { ToDoCounter };


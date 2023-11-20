import React from "react";
import "./ToDoSearch.css";

function ToDoSearch({ searchValue, setSearchValue, onCreateToDo }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchValue.trim() !== "") {
      // Verifica si el valor de búsqueda no está vacío antes de crear el nuevo TODO
      onCreateToDo(searchValue);
      setSearchValue(""); // Limpia el valor de búsqueda después de crear el TODO
    }
  };

  return (
      <input
        placeholder="Buscar TODOs..."
        className="TodoSearch"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
  );
}

export { ToDoSearch };

import React, {  useEffect } from "react";
import "./App.css";
import Modal from 'react-modal';  // Importar react-modal
import LoadingSkeleton from "./LoadingSkeletons";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoSearch } from "./ToDoSearch";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";
import { CreateToDoButton } from "./CreateToDoButton";
import { MusicPlayer } from "./MusicPlayer";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
          setDescription(parsedItem);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 1000);
  }, [itemName, initialValue]);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return { item, saveItem, loading, error , description};
}

function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
    description,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    Modal.setAppElement('#root');  // Ajusta '#root' al ID de tu elemento raíz
  }, []);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const completedTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = "true";
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const searchedTodos = todos.filter((todo) => {
    const textTodo = (todo.text || "").toLowerCase();
    const descriptionTodo = (todo.description || "").toLowerCase();
    const searchText = searchValue.toLowerCase();
    return textTodo.includes(searchText);
  });

  const addToDo = (newTodoText, description) => {
    const newTodos = [
      ...todos,
      { text: newTodoText, completed: false, description: description },
    ];
    saveTodos(newTodos);
  };

  const skeletonCount = todos.length === 0 ? 3 : 0;

  return (
    <React.StrictMode>
      <ToDoCounter completed={completedTodos} total={totalTodos} />
      <ToDoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onCreateToDo={addToDo}
      />
      <ToDoList>
        {loading && <LoadingSkeleton numberOfSkeletons={skeletonCount} />}
        {error && <p>Hubo un error</p>}
        {!loading &&
          searchedTodos.length > 0 &&
          searchedTodos.map((todo, index) => (
            <ToDoItem
              key={index}
              text={todo.text}
              description={todo.description}
              completed={todo.completed}
              onComplete={() => completedTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
              onSaveDescription={(newText, newDescription) => {
                const newTodos = [...todos];
                const todoIndex = newTodos.findIndex(
                  (todo) => todo.text === newText
                );
                newTodos[todoIndex].description = newDescription;
                saveTodos(newTodos);
              }}
            />
          ))}
        {!loading && searchedTodos.length === 0 && (
          <p className="NoTodosMessage">Crea tu primer TODO</p>
        )}
      </ToDoList>
      <CreateToDoButton onCreateToDo={addToDo} />
      <MusicPlayer />
    </React.StrictMode>
  );
}

export default App;

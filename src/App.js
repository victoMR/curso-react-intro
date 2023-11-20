import React from "react";
import "./App.css";
import LoadingSkeleton from "./LoadingSkeletons";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoSearch } from "./ToDoSearch";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";
import { CreateToDoButton } from "./CreateToDoButton";

// const defaultToDos = [
//   { text: "Cortar cebolla", completed: true },
//   { text: "Tomar el curso de intro a React", completed: false },
// ];
function useLocalStorage(itemName, initialValue) {
  // esto es un custom hook

  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

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
  return { item, saveItem, loading, error };
}

function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  // explicquemos mas a detalle completedTodos = todos.filter es una funcion que recibe un parametro que es todo y regresa un booleano
  // !!todo.completed es un booleano que se convierte en un booleano osea con !! se convierte en un booleano
  // .length es la longitud de los elementos que cumplen con la condicion
  const totalTodos = todos.length;

  const completedTodo = (text) => {
    const newTodos = [...todos]; // copia de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = "true";
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos]; // copia de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1); // splice es para eliminar elementos de un array
    saveTodos(newTodos);
  };

  const searchedTodos = todos.filter((todo) => {
    const textTodo = (todo.text || "").toLowerCase();
    const searchText = searchValue.toLowerCase();
    return textTodo.includes(searchText);
  });

  const addToDo = (newTodoText) => {
    const newTodos = [...todos, { text: newTodoText, completed: false }];
    saveTodos(newTodos);
  };

  const skeletonCount = loading ? 3 : todos.length;

  return (
    <React.Fragment>
      <ToDoCounter completed={completedTodos} total={totalTodos} />
      <ToDoSearch searchValue={searchValue} setSearchValue={setSearchValue} onCreateToDo={addToDo} />
      <ToDoList>
      {loading && <LoadingSkeleton numberOfSkeletons={skeletonCount} />}
        {error && <p>Hubo un error</p>}
        {!loading &&
          searchedTodos.length > 0 &&
          searchedTodos.map((todo, index) => (
            <ToDoItem
              key={index}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completedTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}

        {!loading && searchedTodos.length === 0 && <p className="NoTodosMessage">Crea tu primer TODO</p>}
      </ToDoList>

      <CreateToDoButton onCreateToDo={addToDo} />
    </React.Fragment>
  );
}

export default App;

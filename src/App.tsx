import React, { useState } from "react";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<
    MyReadonly2<Todo, "title" | "description">[]
  >([]);

  const addTodo = () => {
    const newTodo: Todo = {
      title: "New Task",
      description: "Task description",
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleCompletion = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      completed: !updatedTodos[index].completed,
    };
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>TODO List</h1>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.title} - {todo.description}
            <button onClick={() => toggleCompletion(index)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

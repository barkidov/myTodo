import { useEffect, useState } from "react";
import { v1 } from "uuid";
import style from "./App.module.css";
import { Todos } from "./components/todos/Todos";
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';


export type TaskType = {
  id: string;
  taskTitle: string;
  isDone: boolean;
};

export type TodoType = {
  id: string;
  title: string;
  tasks: TaskType[];
  rating: number;
  filter: FilterValuesType;
};

export type TodoAndTaskTitleLengthType = {
  maxTodoTitleLength: number;
  minTodoTitleLength: number;
  minTaskTitleLength: number;
  maxTaskTitleLength: number;
};

export type FilterValuesType = "all" | "completed" | "active";

export const App = () => {
  const todoAndTaskTitleLength: TodoAndTaskTitleLengthType = {
    maxTodoTitleLength: 20,
    minTodoTitleLength: 2,
    minTaskTitleLength: 2,
    maxTaskTitleLength: 25,
  };

  const [todoAddInputValue, setTodoAddInputValue] = useState("");
  const [todoError, setTodoError] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const saveTodos = localStorage.getItem("todos");
    return saveTodos ? JSON.parse(saveTodos) : [];
  });

  const todoRatingStars: number[] = [1, 2, 3, 4, 5];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodoTitle = (todoId: string, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const updateTaskTitle = (
    todoId: string,
    taskId: string,
    newTitle: string
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tasks: todo.tasks.map((task) =>
                task.id === taskId ? { ...task, taskTitle: newTitle } : task
              ),
            }
          : todo
      )
    );
  };

  const changeRating = (todoId: string, rating: number) => {
    setTodos(
      todos.map((todo) => (todo.id === todoId ? { ...todo, rating } : todo))
    );
  };

  const setTodoFilter = (todoId: string, filter: FilterValuesType) => {
    setTodos(
      todos.map((todo) => (todo.id === todoId ? { ...todo, filter } : todo))
    );
  };

  const addNewTodoHandler = (title: string) => {
    const newTodo: TodoType = {
      id: v1(),
      title,
      tasks: [],
      rating: 0,
      filter: "all",
    };
    if (
      title.trim().length > todoAndTaskTitleLength.minTodoTitleLength &&
      title.trim().length <= todoAndTaskTitleLength.maxTodoTitleLength
    ) {
      setTodos([...todos, newTodo]);
      setTodoAddInputValue("");
    } else {
      setTodoError(true);
    }
  };

  const addTodoKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTodoHandler(todoAddInputValue);
    }
  };

  const addNewTask = (todoId: string, taskTitle: string) => {
    const newTask = { id: v1(), taskTitle, isDone: false };

    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, tasks: [...todo.tasks, newTask] } : todo
      )
    );
  };

  const removeTodoList = (todoId: string) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const removeTask = (todoId: string, taskId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, tasks: todo.tasks.filter((task) => task.id !== taskId) }
          : todo
      )
    );
  };

  const changeTaskStatus = (
    todoId: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tasks: todo.tasks.map((task) =>
                task.id === taskId ? { ...task, isDone } : task
              ),
            }
          : todo
      )
    );
  };

  return (
    <>
      <TextField label="Add todo" variant="filled" color="primary"
        value={todoAddInputValue}
        onChange={(e) => {
          setTodoAddInputValue(e.currentTarget.value);
          setTodoError(false);
        }}
        onKeyDown={addTodoKeyDownHandler}
      />
      <Button sx={{backgroundColor: "rgb(0,0,0)"}} size="large" onClick={() => addNewTodoHandler(todoAddInputValue)}><AddBoxIcon sx={{ fontSize: 40 }} color='primary'/></Button>
      {todoError && (
        <div style={{ color: "red" }}>
          Название должно быть больше{" "}
          {todoAndTaskTitleLength.minTodoTitleLength}-х символов и не более{" "}
          {todoAndTaskTitleLength.maxTodoTitleLength}-ти символов.
        </div>
      )}
      <div className={style.todoContainer}>
        <Todos
          todos={todos}
          todoRatingStars={todoRatingStars}
          changeRating={changeRating}
          addNewTask={addNewTask}
          removeTodoList={removeTodoList}
          removeTask={removeTask}
          changeTaskStatus={changeTaskStatus}
          todoAndTaskTitleLength={todoAndTaskTitleLength}
          setTodoFilter={setTodoFilter}
          updateTodoTitle={updateTodoTitle}
          updateTaskTitle={updateTaskTitle}
        />
      </div>
    </>
  );
};

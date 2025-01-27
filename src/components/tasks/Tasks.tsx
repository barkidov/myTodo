import { useState } from "react";
import {
  FilterValuesType,
  TodoAndTaskTitleLengthType,
  TodoType,
} from "../../App";
import Button from '@mui/material/Button';
import { Input } from "../input/Input";
import { FilteredButtons } from "../filteredButtons/FilteredButtons";
import style from "./Tasks.module.css";
import { EditableSpan } from "../editableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';


type PropsType = {
  todo: TodoType;
  todoAndTaskTitleLength: TodoAndTaskTitleLengthType;
  addNewTask: (todoId: string, taskTitle: string) => void;
  removeTask: (todoId: string, taskId: string) => void;
  changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void;
  setTodoFilter: (todoId: string, filter: FilterValuesType) => void;
  updateTaskTitle: (todoId: string, taskId: string, newTitle: string) => void;
};

export const Tasks = ({
  todo,
  todoAndTaskTitleLength,
  addNewTask,
  removeTask,
  changeTaskStatus,
  setTodoFilter,
  updateTaskTitle,
}: PropsType) => {
  const [tasksAddInputValue, setTasksAddInputValue] = useState("");
  const [taskError, setTaskError] = useState(false);

  const filteredTasks = todo.tasks.filter((task) => {
    if (todo.filter === "completed") return task.isDone;
    if (todo.filter === "active") return !task.isDone;
    return true;
  });

  const addNewTaskHandler = (todoId: string, taskTitle: string) => {
    if (
      taskTitle.trim().length > todoAndTaskTitleLength.minTaskTitleLength &&
      taskTitle.trim().length <= todoAndTaskTitleLength.maxTaskTitleLength
    ) {
      addNewTask(todoId, taskTitle);
      setTasksAddInputValue("");
    } else {
      setTaskError(true);
    }
  };

  const addTaskKeyDownHandler = (
    e: React.KeyboardEvent<HTMLDivElement>,
    todoId: string,
    taskTitle: string
  ) => {
    if (e.key === "Enter") {
      addNewTaskHandler(todoId, taskTitle);
      setTasksAddInputValue("");
    }
  };

  const removeTaskHandler = (todoId: string, taskId: string) => {
    removeTask(todoId, taskId);
  };

  const changeTaskStatusHandler = (
    todoId: string,
    taskId: string,
    isDone: boolean
  ) => {
    changeTaskStatus(todoId, taskId, isDone);
  };
  
  return (
    <ul>
      <TextField id="standard-basic" label="Add task" variant="filled" color="primary"
        value={tasksAddInputValue}
        onChange={(e) => {
          setTasksAddInputValue(e.currentTarget.value);
          setTaskError(false);
        }}
        onKeyDown={(e) => addTaskKeyDownHandler(e, todo.id, tasksAddInputValue)}
      />
      <Button sx={{backgroundColor: "rgb(0,0,0)"}} size="large" onClick={() => addNewTaskHandler(todo.id, tasksAddInputValue)}>
      <AddBoxIcon color='primary' sx={{ fontSize: 40 }}/>
      </Button>
      {taskError && (
        <div style={{ color: "red" }}>
          Название должно быть больше{" "}
          {todoAndTaskTitleLength.minTaskTitleLength}-х символов и не более{" "}
          {todoAndTaskTitleLength.maxTaskTitleLength}-ти символов.
        </div>
      )}
      {filteredTasks.map((task) => (
        <li key={task.id} className={`${task.isDone ? style.checkedTask : ''} ${style.list}`}>
          <div className={style.checkboxAndEditSpan}>
          <Input
            type="checkbox"
            checked={task.isDone}
            onChange={() =>
              changeTaskStatusHandler(todo.id, task.id, !task.isDone)
            }
          />
          <EditableSpan
            title={task.taskTitle}
            onUpdate={(newTitle: string) =>
              updateTaskTitle(todo.id, task.id, newTitle)
            }
          />
          </div>
          <Button sx={{backgroundColor: "rgb(0,0,0)"}} size="large" onClick={() => removeTaskHandler(todo.id, task.id)}><DeleteForeverIcon color='primary'/></Button>
        </li>
      ))}
      <FilteredButtons
        todoFilterChangeHandler={(filter: FilterValuesType) =>
          setTodoFilter(todo.id, filter)
        }
        children
      />
    </ul>
  );
};

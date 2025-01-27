import {
  FilterValuesType,
  TodoAndTaskTitleLengthType,
  TodoType,
} from "../../App";
import Button from '@mui/material/Button';
import { Rating } from "../rating/Rating";
import { Tasks } from "../tasks/Tasks";
import { EditableSpan } from "../editableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Grid2, Paper } from "@mui/material";
import style from './Todos.module.css'

type PropsType = {
  todos: TodoType[];
  todoRatingStars: number[];
  todoAndTaskTitleLength: TodoAndTaskTitleLengthType;
  changeRating: (todoId: string, rating: number) => void;
  addNewTask: (todoId: string, taskTitle: string) => void;
  removeTodoList: (todoId: string) => void;
  removeTask: (todoId: string, taskId: string) => void;
  changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void;
  setTodoFilter: (todoId: string, filter: FilterValuesType) => void;
  updateTodoTitle: (todoId: string, newTitle: string) => void;
  updateTaskTitle: (todoId: string, taskId: string, newTitle: string) => void;
};

export const Todos = ({
  todos,
  todoRatingStars,
  todoAndTaskTitleLength,
  changeRating,
  addNewTask,
  removeTodoList,
  removeTask,
  changeTaskStatus,
  setTodoFilter,
  updateTodoTitle,
  updateTaskTitle,
}: PropsType) => {
  return (
    <>
    <Grid2 container spacing={10}>
      {todos.map((todo) => (
        <div key={todo.id}>
          <Container maxWidth="xs">
          <Paper elevation={5} sx={{ width: "500px", height: "auto", padding: "16px"}}>
            <h2 className={style.todoTitle}>
              <Grid2 display={'flex'} justifyContent={'space-between'}>
              <EditableSpan
                title={todo.title}
                onUpdate={(newTitle: string) =>
                  updateTodoTitle(todo.id, newTitle)
                }
              />
              <Button sx={{backgroundColor: "rgb(0,0,0)"}} size="large" onClick={() => removeTodoList(todo.id)}>
                <DeleteIcon color="primary" />
              </Button>
              </Grid2>
            </h2>
            <Tasks
              todo={todo}
              addNewTask={addNewTask}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              todoAndTaskTitleLength={todoAndTaskTitleLength}
              setTodoFilter={setTodoFilter}
              updateTaskTitle={updateTaskTitle}
            />
            <Rating
              todo={todo}
              todoRatingStars={todoRatingStars}
              changeRating={changeRating}
            />
          </Paper>
          </Container>
        </div>
      ))}
      </Grid2>
    </>
  );
};

import { TodoType } from "../../App";
import style from "./Rating.module.css";

type PropsType = {
  todo: TodoType;
  todoRatingStars: number[];
  changeRating: (todoId: string, rating: number) => void;
};

export const Rating = ({ ...props }: PropsType) => {
  const { todo, todoRatingStars, changeRating } = props;

  const changeRatingHandler = (todoId: string, rating: number) => {
    changeRating(todoId, rating);
  };
  return (
    <div className={style.ratingContainer}>
      <span
        className={style.spanForRemoveRating}
        onClick={() => changeRatingHandler(todo.id, 0)}
      ></span>
      {todoRatingStars.map((star) => {
        return (
          <span
            onClick={() => changeRatingHandler(todo.id, star)}
            key={star}
            className={star <= todo.rating ? style.gold : style.black}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

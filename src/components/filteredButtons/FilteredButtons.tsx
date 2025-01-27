import { FilterValuesType } from "../../App";
import Button from "@mui/material/Button";
import style from "./FilteredButtons.module.css";

type PropsType = {
  children: React.ReactNode;
  todoFilterChangeHandler: (filter: FilterValuesType) => void;
};
export const FilteredButtons = ({ todoFilterChangeHandler }: PropsType) => {
  return (
    <div className={style.filteredButtonsContainer}>
      <Button
        sx={{ backgroundColor: "rgb(0,0,0)" }}
        size="large"
        onClick={() => todoFilterChangeHandler("all")}
        color={'info'}
      >
        All
      </Button>
      <Button
        sx={{ backgroundColor: "rgb(0,0,0)" }}
        size="large"
        onClick={() => todoFilterChangeHandler("completed")}
      >
        Completed
      </Button>
      <Button
        sx={{ backgroundColor: "rgb(0,0,0)" }}
        size="large"
        onClick={() => todoFilterChangeHandler("active")}
      >
        Active
      </Button>
    </div>
  );
};

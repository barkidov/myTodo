import { FilterValuesType } from "../../App";
import Button from "@mui/material/Button";
import style from "./FilteredButtons.module.css";
import { useState } from "react";

type PropsType = {
  todoFilterChangeHandler: (filter: FilterValuesType) => void;
};

export const FilteredButtons = ({ todoFilterChangeHandler }: PropsType) => {
  const [activeFilter, setActiveFilter] = useState<FilterValuesType>("all");

  const handleClick = (filter: FilterValuesType) => {
    setActiveFilter(filter);
    todoFilterChangeHandler(filter);
  };

  const getButtonStyle = (filter: FilterValuesType) => ({
    backgroundColor: activeFilter === filter ? "rgb(207, 207, 207)" : "rgb(0, 0, 0)",
    color: activeFilter === filter ? "rgb(0, 0, 0)" : "white",
    "&:hover": {
      backgroundColor: "rgb(207, 207, 207)",
      color: "rgb(0, 0, 0)",
    },
  });

  return (
    <div className={style.filteredButtonsContainer}>
      <Button sx={getButtonStyle("all")} size="large" onClick={() => handleClick("all")}>
        All
      </Button>
      <Button sx={getButtonStyle("completed")} size="large" onClick={() => handleClick("completed")}>
        Completed
      </Button>
      <Button sx={getButtonStyle("active")} size="large" onClick={() => handleClick("active")}>
        Active
      </Button>
    </div>
  );
};

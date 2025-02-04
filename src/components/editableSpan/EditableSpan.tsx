import { useState } from "react";
import { Input } from "../input/Input";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import style from "./EditableSpan.module.css";

type PropsType = {
  onUpdate: (newTitle: string) => void;
  title: string;
};

export const EditableSpan = ({ onUpdate, title }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const updateTitleHander = (newTitle: string) => {
    onUpdate(newTitle);
    setIsEditing(false);
  };

  const changeTitleHandler = () => {
    setIsEditing(true);
    setNewTitle(title);
  };

  return (
    <span className={style.editableSpan}>
      {isEditing ? (
        <Input
          autoFocus
          onBlur={() => updateTitleHander(newTitle)}
          value={newTitle}
          onChange={(e) => setNewTitle(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateTitleHander(newTitle);
            if (e.key === "Escape") setIsEditing(false);
          }}
        />
      ) : (
        <span className={style.titleSpan}>{title}</span>
      )}
      <Button
        sx={{
          backgroundColor: "rgb(0,0,0)",
          "&:hover": {
            backgroundColor: "rgb(207, 207, 207)",
            color: "rgb(0,0,0)",
          },
        }}
        size="large"
        className={style.editButton}
        onClick={changeTitleHandler}
      >
        <BorderColorIcon color="primary" />
      </Button>
    </span>
  );
};

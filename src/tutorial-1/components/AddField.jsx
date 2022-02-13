import React from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({
  onClickAdd,
  text,
  onChangeInput,
  onChangeCheckbox,
}) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onChange={onChangeCheckbox}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={text}
        onChange={onChangeInput}
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};

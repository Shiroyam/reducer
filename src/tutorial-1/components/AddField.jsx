import React from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ onAdd }) => {
  const [value, setValue] = React.useState("");
  const [check, setCheck] = React.useState(false);

  const onClickAdd = () => {
    onAdd(value, check);
    setValue("");
    setCheck(false);
  };
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={check}
        onChange={(e) => setCheck(e.target.checked)}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};

import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: action.checkbox,
      },
    ];
  }
  return state;
}

function App() {
  const [id, setId] = React.useState(0)
  const [text, setText] = React.useState("");

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const [checkbox, setCheckbox] = React.useState(false);

  const onChangeCheckbox = () => {
    if (checkbox === false) {
      return setCheckbox(true);
    } else if (checkbox === true) {
      return setCheckbox(false);
    }
  };

  const [state, dispatch] = React.useReducer(reducer, [{}]);

  const AddTask = () => {
    setId(id + 1)
    dispatch({
      type: "ADD_TASK",
      text,
      checkbox,
      id
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={AddTask}
          text={text}
          onChangeInput={onChangeInput}
          onChangeCheckbox={onChangeCheckbox}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;

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
        text: action.value,
        complete: action.check,
      },
    ];
  }

  if (action.type === "DELET_TASK") {
    return state.filter((elem) => elem.id !== action.id);
  }
  return state;
}

function App() {
  const [id, setId] = React.useState(-1);
  const [state, dispatch] = React.useReducer(reducer, []);

  const AddTask = (value, check) => {
    setId(id + 1);
    dispatch({
      type: "ADD_TASK",
      value,
      check,
      id,
    });
  };

  const DeletTask = (id) => {
    dispatch({
      type: "DELET_TASK",
      id,
    });
  };
  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={AddTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item
              DeletTask={DeletTask}
              id={obj.id}
              key={obj.id}
              text={obj.text}
              complete={obj.completed}
            />
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

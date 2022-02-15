import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: action.payload.id,
        text: action.payload.value,
        completed: action.payload.check,
      },
    ];
  }

  if (action.type === "DELET_TASK") {
    return state.filter((obj) => obj.id !== action.payload);
  }

  if (action.type === "TOGGLE_CHECKED") {
    return state.map((obj) => {
      if (obj.id === action.payload) {
        return {
          ...obj,
          completed: !obj.completed,
        };
      }
      return obj;
    });
  }
  return state;
}

function App() {
  const [id, setId] = React.useState(null);
  const [state, dispatch] = React.useReducer(reducer, []);

  const addTask = (value, check) => {
    setId(id + 1);
    dispatch({
      type: "ADD_TASK",
      payload: {
        value,
        check,
        id,
      },
    });
  };

  const deletTask = (id) => {
    if (window.confirm("Хотите удалить?")) {
      dispatch({
        type: "DELET_TASK",
        payload: id,
      });
    }
  };

  const toggleComplete = (id) => {
    dispatch({
      type: "TOGGLE_CHECKED",
      payload: id,
    });
  };
  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
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
              deletTask={deletTask}
              id={obj.id}
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onClickCheckbox={() => toggleComplete(obj.id)}
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

import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";


function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: +new Date() + Math.random(),
        text: action.payload.value,
        completed: action.payload.check,
      },
    ];
  }

  if (action.type === "DELET_TASK") {
    return state.filter((obj) => obj.id !== action.payload);
  }

  if (action.type === "CLEAR_TASK") {
    return [];
  }

  if (action.type === "FALSE_CHECKBOX") {
    return state.map((obj) => {
      return { ...obj, 
        completed: !obj.completed };
    });
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
  const [activeBtn, setActiveBtn] = React.useState(0);
  const [state, dispatch] = React.useReducer(reducer, []);

  const addTask = (value, check) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        value,
        check,
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

  const onClickBtnClear = () => {
    dispatch({
      type: "CLEAR_TASK",
    });
  };

  const onClickCheckboxFalse = () => {
    dispatch({
      type: "FALSE_CHECKBOX",
    });
  };

  const onClickTaskAll = () => {
    setActiveBtn(0);
  };

  const onClickTaskActive = () => {
    setActiveBtn(1);
  };

  const onClickTaskEnd = () => {
    setActiveBtn(2);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={activeBtn}>
          <Tab label="Все" onClick={onClickTaskAll} />
          <Tab label="Активные" onClick={onClickTaskActive} />
          <Tab label="Завершённые" onClick={onClickTaskEnd} />
        </Tabs>
        <Divider />
        <List>
          {activeBtn === 0 && 
          state.map((obj) => (
            <Item
              deletTask={deletTask}
              id={obj.id}
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onClickCheckbox={() => toggleComplete(obj.id)}
            />
          ))}
          {activeBtn === 1 &&
          state.filter((obj) => obj.completed === true).map((obj) => (
            <Item
              deletTask={deletTask}
              id={obj.id}
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onClickCheckbox={() => toggleComplete(obj.id)}
            />
          ))
          }
          {activeBtn === 2 &&
          state.filter((obj) => obj.completed === false).map((obj) => (
            <Item
              deletTask={deletTask}
              id={obj.id}
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onClickCheckbox={() => toggleComplete(obj.id)}
            />
          ))
          }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={onClickCheckboxFalse}>Отметить всё</Button>
          <Button onClick={onClickBtnClear}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;

import classNames from "classnames";
import { useList, useStore } from "effector-react";
import "./App.css";
import model from "./model";

const FormTodo = () => {
  const input = useStore(model.$input);
  return (
    <form className="form">
      <input
        className="input"
        value={input}
        placeholder="Введите задачу"
        onChange={(e) => model.change(e.target.value)}
      />
      <button type="submit" onClick={model.submit}>
        Добавить
      </button>
    </form>
  );
};

function App() {
  const todos = useList(model.$todos, (item) => (
    <li key={item.id} className="todo">
      <p
        className={classNames({
          todo__text: true,
          todo__text_completed: item.completed,
        })}
      >
        {item.title}
      </p>
      <div className="todo__actions">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => model.changeCompleted(item.id)}
        />
        <button type="button" onClick={() => model.remove(item.id)}>
          Удалить
        </button>
      </div>
    </li>
  ));

  return (
    <div className="wrapper">
      <h1>Задачи на сегодня</h1>
      <FormTodo />
      <ul>{todos}</ul>
    </div>
  );
}

export default App;

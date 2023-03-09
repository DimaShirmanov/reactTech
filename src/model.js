import { createEvent, createStore, sample } from "effector";
import connectLocalStorage from "effector-localstorage";

const change = createEvent();
const submit = createEvent();
const insert = createEvent();
const reset = createEvent();
const remove = createEvent();
const changeCompleted = createEvent();

submit.watch((e) => e.preventDefault());

const todosLocalStorage = connectLocalStorage("TODOS").onError((err) =>
  console.log(err)
);

const $todos = createStore(todosLocalStorage.init([]))
  .on(insert, (todos, newTodo) => [
    ...todos,
    {
      id: Date.now(),
      title: newTodo,
      completed: false,
      date: Date.now(),
    },
  ])
  .on(remove, (todos, id) => todos.filter((item) => item.id !== id))
  .on(changeCompleted, (todos, id) =>
    todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  );

$todos.watch(todosLocalStorage);
const $input = createStore("")
  .on(change, (_, value) => value)
  .reset(reset, insert);

sample({
  clock: submit,
  source: $input,
  target: insert,
});

export default {
  $todos,
  change,
  $input,
  submit,
  changeCompleted,
  remove,
};

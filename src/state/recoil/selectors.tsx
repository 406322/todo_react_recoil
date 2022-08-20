import { selector } from "recoil";
import { todoListState } from "./atoms";
import { todoListFilterState } from "./atoms";

export const todoCountState = selector({
  key: "todoCountState",
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.length;
  },
});

export const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {

    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
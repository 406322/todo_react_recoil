import { atom } from "recoil";
import { Todo } from "../../models/todo"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const todoListState = atom<Todo[]>({
  key: "TodoList",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const todoListFilterState = atom({
  key: "TodoListFilter",
  default: "Show All",
});


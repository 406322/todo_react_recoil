import { useRecoilValue } from "recoil";
import { Todo } from "../models/todo";
import { filteredTodoListState } from "../state/recoil/selectors"
import { ListItem } from "./listItem";

export const List = () => {

  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      {todoList &&
        todoList.map((todo: Todo) => <ListItem key={todo.id} props={todo} />)}
    </>
  );
};

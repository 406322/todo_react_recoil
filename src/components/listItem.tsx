import { useRecoilState } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { Todo } from "../models/todo";
import { useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { GrEdit } from 'react-icons/gr';


export const ListItem = ({ props }: { props: Todo }): JSX.Element => {
  let navigate = useNavigate();
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleDelete = () => {
    const newState = todoList.filter((todo: Todo) => todo.id !== props.id);
    setTodoList(newState);
  };

  const handleEdit = (): void => {
    navigate(`/${props.id}`, { replace: true });
  };

  const handleToggleComplete = (): void => {
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === props.id) {
          const tempTodo = { ...todo };
          tempTodo.isComplete = !tempTodo.isComplete;
          return tempTodo;
        }
        return todo;
      })
    );
  };

  return (
    <div className=" flex justify-between m-5 p-5 rounded-md bg-gray-200">

      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={props.isComplete}
          className="w-7 h-7 cursor-pointer"
          onChange={handleToggleComplete}
        />

        <p className="font-normal text-black mb-3 text-center">
          {props.description}
        </p>
      </div>

      <div className="flex gap-3">
        <TiDeleteOutline
          className="w-7 h-7 cursor-pointer"
          onClick={() => handleDelete()}
        />

        <GrEdit
          className="w-7 h-7 cursor-pointer"
          onClick={() => handleEdit()}
        />
      </div>

    </div>
  );
};
